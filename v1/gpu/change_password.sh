#!/bin/bash

new_password=$1

jupyter_pass=`cat /jupyter.pass`
if [ $jupyter_pass = "default_pass" ]; then
    echo $jupyter_pass
    echo $new_password

    jupyter notebook --generate-config

    hashed_pw=`/usr/local/bin/python -c "from notebook.auth import passwd; print(passwd('$new_password'))"`

    echo $new_password
    echo $hashed_pw

    sed "s@#c.NotebookApp.password = ''@c.NotebookApp.password = '$hashed_pw'@" /root/.jupyter/jupyter_notebook_config.py | tee /root/.jupyter/tmp.py

    sed "s@#c.NotebookApp.password_required = False@c.NotebookApp.password_required = True@" /root/.jupyter/tmp.py | tee /root/.jupyter/tmp2.py

    mv /root/.jupyter/tmp2.py /root/.jupyter/jupyter_notebook_config.py

    echo $new_password
    echo $hashed_pw

    echo $hashed_pw > /jupyter.pass

else
    echo "not the first start"
    echo $jupyter_pass
    hashed_pw=`cat /jupyter.pass`
fi

/usr/local/bin/python /usr/local/bin/jupyter-notebook --notebook-dir /tf --ip 0.0.0.0 --no-browser --allow-root --NotebookApp.password=$hashed_pw

