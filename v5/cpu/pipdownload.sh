#!/bin/bash

export CACHETMPDIR=/cache_tmp
TARGET_PACKAGE=$1
#if [ "v1" == "$1" ] ; then
#    echo 'v1'
#elif [ "v2" == "$1" ] ; then
#    echo 'v2'
#    TARGET_PACKAGE='torch==1.4.0'
#elif [ "v4" == "$1" ] ; then
#    echo 'v4'
#    TARGET_PACKAGE='torch==2.1.1'
#elif [ "v5" == "$1" ] ; then
#    echo 'v5'
#    TARGET_PACKAGE='torch==2.1.2'
#else
#    echo
#fi

pip download -d /downloaded_python_packages --cache-dir $CACHETMPDIR $TARGET_PACKAGE
