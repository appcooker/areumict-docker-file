#!/bin/bash

CACHE_TMP_DIR=/areumict/cache_tmp
TARGET_PACKAGE=torch==2.2.1

pip download --cache-dir $CACHE_TMP_DIR -d ./downloaded_python_packages $TARGET_PACKAGE
pip download --cache-dir $CACHE_TMP_DIR -d ./downloaded_python_packages build
