README.md
# 管理方法  

## astroの実行方法

astroのセットアップ
- nodeのバージョンはCloudflareと合わせること。
```sh
docker run --rm -v $PWD:/src -w /src -u `id -u`:`id -g` -p 80:4321 -it node:18.17.1 npm install
```

astro 4 追加機能(いらない)の無効化
```sh
npm run astro preferences disable devToolbar
```

環境設定値を`.env.template`に沿って作成する。

node.jsコンテナを起動
- nodeのバージョンはCloudflareと合わせること。
```sh
docker run --rm -v $PWD:/src -w /src -u `id -u`:`id -g` -p 80:4321 -it node:18.17.1 /bin/bash
```

nodejs実行方法
```sh
# 仮想DOM実行(astro SSRモード起動)
npm run dev
# 静的サイトジェネレート(astro SSG build)
npm run build
```

## デプロイ方法

Cloudflareで自動でビルドされるため、サーバへのアップロードは不要になった。