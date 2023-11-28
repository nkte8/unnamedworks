#!/bin/bash
cd $(dirname $0)

apt list --installed 2>/dev/null | grep pngquant >/dev/null
[[ $? -ne 0 ]] && sudo apt-get install pngquant -y

apt list --installed 2>/dev/null | grep convert >/dev/null
[[ $? -ne 0 ]] && sudo apt install imagemagick -y

GIT_UNCOMPRESSED_FILES=$(git status | grep .png | grep -v "public" | xargs)
echo "compless... $GIT_UNCOMPRESSED_FILES"
pngquant --ext .png --force $GIT_UNCOMPRESSED_FILES

CARDS_SRC="./public/cards"
for filepath in $GIT_UNCOMPRESSED_FILES;do 
    echo "$filepath" | grep "images/" 
    [[ $? -ne 0 ]] && continue;
    FNAME=$(basename $filepath)
    if [[ ! -e "${CARDS_SRC}/${FNAME}" ]];then
        echo "create card of $filepath";
            convert "$filepath" -resize 1200x1200 - \
            | convert - -crop 1200x600+0+200 "${CARDS_SRC}/${FNAME}"
    else
        echo "already exists.. ${CARDS_SRC}/${FNAME}"
    fi
done
echo "Complete!"