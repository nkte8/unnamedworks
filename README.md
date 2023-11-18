# portfolio

ポートフォリオ用サイト（Profileサイト）のソースコード

# 実行方法

astroの実行
```
# init
docker run --rm -v $PWD:/src -w /src -u `id -u`:`id -g` -p 80:4321 -it node:lts npm install

# shell debug
docker run --rm -v $PWD:/src -w /src -u `id -u`:`id -g` -p 80:4321 -it node:lts /bin/bash
npm run dev
```

ロリポップftpサーバへのアップロード
```
# ローカルwebサーバへのデプロイ確認
./up2local.sh

# .netrc でレンタルサーバへアクセスする情報が記載されていること
./up2server.sh
```