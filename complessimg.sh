#!/bin/bash
cd $(dirname $0)

apt list --installed 2>/dev/null | grep pngquant >/dev/null
[[ $? -ne 0 ]] && sudo apt-get install pngquant -y

GIT_UNCOMPRESSED_FILES=$(git status | grep .png | xargs)
echo "compless... $GIT_UNCOMPRESSED_FILES"
pngquant --ext .png --force $GIT_UNCOMPRESSED_FILES
