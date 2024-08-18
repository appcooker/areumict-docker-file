FROM tensorflow/tensorflow:1.14.0-gpu-jupyter

USER root

RUN apt-key del 7fa2af80

RUN apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/3bf863cc.pub

RUN apt-get update \
    && apt-get install -y python3-pip

RUN python3.6 -m pip install protobuf==3.19.6
RUN python3.6 -m pip install tensorflow-gpu==1.14.0
RUN python3.6 -m pip install keras==2.2.4
RUN python3.6 -m pip install torch==1.3.1

RUN python3.6 -m pip install ipykernel

RUN echo '{"argv":["/usr/bin/python3.6","-m","ipykernel_launcher","-f","{connection_file}"],"display_name":"Python 3","language":"python"}' > /usr/local/share/jupyter/kernels/python3/kernel.json

RUN echo "default_pass" > /jupyter.pass

COPY ./change_password.sh /root/.jupyter/change_password.sh

CMD ["/bin/bash","/root/.jupyter/change_password.sh"]

RUN mkdir -p /tf/areumict

COPY ./sessions /tf/areumict/sessions
COPY ./code-logging /tf/areumict/code-logging

