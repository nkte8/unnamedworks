#!/bin/bash
cd $(dirname $0)

apt list --installed 2>/dev/null | grep woff2 >/dev/null
[[ $? -ne 0 ]] && sudo apt-get install woff2 -y

TMPDIR=/tmp
DIST=./public/materials/shape02.woff2

mkdir $TMPDIR
curl -L https://2ttf.com/webfont/KVrGXqqCBcG/webfont.ttf --output ${TMPDIR}/webfont.ttf
woff2_compress ${TMPDIR}/webfont.ttf

mv -f ${TMPDIR}/webfont.woff2 ${DIST}
rm -v ${TMPDIR}/webfont.*