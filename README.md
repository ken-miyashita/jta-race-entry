# Next.js + MySQL でレースエントリーシステムの骨組みを作る

## はじめに

基本的には、[Fullstack Example with Next.js (REST API)](https://github.com/prisma/prisma-examples/tree/latest/orm/nextjs-api-routes) をベースに作成している。

## 準備

- node.js
- docker (開発時にローカルで MySQL サーバーを立てるため)

## 起動方法（開発時）

ターミナル上で以下の準備をする。

```bash
# MySQL サーバーを 3306 ポートで立ち上げる
$ docker-compose up

# 依存するパッケージをインストール
$ yarn

# next.js サーバーを起動
$ yarn dev
```

web ブラウザで http://localhost:3000 にアクセスする。
