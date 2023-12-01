#!/bin/bash
cd $(dirname $0)
if [[ ! -e .env ]];then
    echo "ERROR: create .env file."
    exit 1;
fi
source ./.env

git branch --contains | grep "*" | grep main >/dev/null
if [[ $? -ne 0 ]];then
    echo "ERROR: here is no main branch."
    exit 1;
fi

# 再帰削除/アップロードにlftpを利用する
# オープンソースウェアだから信頼性はあるはず https://github.com/lavv17/lftp
apt list --installed 2>/dev/null | grep lftp >/dev/null
[[ $? -ne 0 ]] && sudo apt-get install lftp -y
lftp --version | head -1

lftp -u ${FTP_USER},${FTP_PASS} $FTP_URL << EOF
rm -rf ./${FTP_DIRECTORY}
mkdir ./${FTP_DIRECTORY}
cd ./${FTP_DIRECTORY}
put ./.htaccess
put ./robots.txt 
lcd ./docs
mirror -R
EOF

echo "Complete."