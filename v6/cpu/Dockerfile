FROM tensorflow/tensorflow:2.15.0-jupyter

RUN pip install torch==2.2.0

RUN echo "default_pass" > /jupyter.pass

COPY ./change_password.sh /root/.jupyter/change_password.sh

USER root

COPY ./codelogging-0.1.0-py3-none-any.whl /root/.jupyter
RUN pip install /root/.jupyter/codelogging-0.1.0-py3-none-any.whl

CMD ["/bin/bash","/root/.jupyter/change_password.sh"]