#!/bin/bash

DOCKERFILE_VERSION=`cd ..;basename $PWD`

function MakeSureDirectoryPathExists {
  if [ ! -d "$1" ]; then
    mkdir $1
  fi
}

MakeSureDirectoryPathExists ./downloaded_python_packages
MakeSureDirectoryPathExists ./cache_tmp
MakeSureDirectoryPathExists ./tf

docker run -itd -p 18888:8888 \
  -v $PWD/tf:/tf \
  -v $PWD/downloaded_python_packages:/downloaded_python_packages \
  --name tf-server-v5-cpu \
  otwo/test_image_v5cpu:latest /bin/bash /root/.jupyter/change_password.sh aaa
