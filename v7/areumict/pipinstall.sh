#!/bin/bash

CACHE_TMP_DIR=/areumict/cache_tmp
TARGET_PACKAGE=torch==2.2.1

pip install --cache-dir $CACHE_TMP_DIR --target /areumict/installed_python_packages --no-index -f ./downloaded_python_packages $TARGET_PACKAGE
pip install --cache-dir $CACHE_TMP_DIR --target /areumict/installed_python_packages --no-index -f ./downloaded_python_packages build
