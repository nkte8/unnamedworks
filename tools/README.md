# サーバへのアップロード方法

`.env`を`.env.template`を参考にホームディレクトリへ作成。

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