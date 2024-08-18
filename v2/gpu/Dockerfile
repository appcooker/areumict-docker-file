FROM tensorflow/tensorflow:1.15.5-gpu-jupyter

RUN pip install torch==1.4.0

RUN echo "default_pass" > /jupyter.pass

COPY ./change_password.sh /root/.jupyter/change_password.sh

USER root

CMD ["/bin/bash","/root/.jupyter/change_password.sh"]

RUN mkdir -p /tf/areumict

COPY ./sessions /tf/areumict/sessions
COPY ./code-logging /tf/areumict/code-logging

