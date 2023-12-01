# README.md

# 管理方法  

## astroの実行方法

- astroのセットアップ
```
docker run --rm -v $PWD:/src -w /src -u `id -u`:`id -g` -p 80:4321 -it node:lts npm install
```

- node.jsコンテナを起動
```
docker run --rm -v $PWD:/src -w /src -u `id -u`:`id -g` -p 80:4321 -it node:lts /bin/bash
```

- nodejs実行方法
```
# 仮想DOM実行(astro SSRモード起動)
npm run dev
# 静的サイトジェネレート(astro SSG build)
npm run build
```

## サーバへのアップロード方法

ローカルwebサーバへのデプロイ  
```sh
./up_localserver.sh
```

ftpサーバへのアップロード
```sh
./up_remoteserver.sh
```

ftpサーバを再デプロイ
```sh
./reset_server.sh
```