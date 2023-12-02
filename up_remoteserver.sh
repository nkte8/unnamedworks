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

# backupディレクトリを作成
r_ver=00$(($(find ./bak/ -name $(date +%Y-%m-%d)* | wc -l) + 1))
DATE_SLUG=$(date +%Y-%m-%d)-r${r_ver: -2}
mkdir -p ./bak/${DATE_SLUG}

# backup工程
lftp -u ${FTP_USER},${FTP_PASS} $FTP_URL << EOF
cd ./${FTP_DIRECTORY}
lcd ./bak/${DATE_SLUG}
mirror
EOF

# upload（上書き）
lftp -u ${FTP_USER},${FTP_PASS} $FTP_URL << EOF
cd ./${FTP_DIRECTORY}
lcd ./docs
mirror -R --overwrite --ignore-time
EOF

echo "Complete."