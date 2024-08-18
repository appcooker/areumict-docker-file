#!/bin/bash

docker run -itd -p 18888:8888 -v /Users/danny/workspace_tf:/tf --name tf-server-v2-cpu \
  otwo/test_image_v2cpu:latest /bin/bash /root/.jupyter/change_password.sh aaa
