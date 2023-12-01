#!/bin/bash
cd $(dirname $0)
if [[ ! -e .env ]];then
    echo "ERROR: create .env file."
    exit 1;
fi
source ./.env

# 再帰削除/アップロードにlftpを利用する
# オープンソースウェアだから信頼性はあるはず https://github.com/lavv17/lftp
apt list --installed 2>/dev/null | grep lftp >/dev/null
[[ $? -ne 0 ]] && sudo apt-get install lftp -y
lftp --version | head -1

# 記事追加の場合はリソースの削除を行わず、
lftp -u ${FTP_USER},${FTP_PASS} $FTP_URL << EOF
cd ./${FTP_DIRECTORY}
lcd ./docs
mirror -R --overwrite --ignore-time
EOF

echo "Complete."