FROM tensorflow/tensorflow:2.16.1-jupyter

RUN pip install torch==2.2.1

RUN echo "default_pass" > /jupyter.pass

COPY ./change_password.sh /root/.jupyter/change_password.sh

USER root

RUN mkdir -p /tf/areumict
COPY ./sessions /tf/areumict/sessions
COPY ./codelogging /tf/areumict/codelogging
RUN pip install /tf/areumict/codelogging/codelogging-0.1.0-py3-none-any.whl

CMD ["/bin/bash","/root/.jupyter/change_password.sh"]
