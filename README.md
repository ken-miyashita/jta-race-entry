# Next.js + MySQL でレースエントリーシステムを作る

## はじめに

基本的には、[Fullstack Example with Next.js (REST API)](https://github.com/prisma/prisma-examples/tree/latest/orm/nextjs-api-routes) をベースに作成している。

## ローカル環境での開発

### 準備

以下のソフトウェアをインストールする。

- node.js (v18.20.6)
- docker (開発時にローカルで MySQL サーバーを立てるため)

以下の環境変数を設定する。

- MYSQL_DATABASE: MySQL のデータベース名。'mydatabase' とする。
- MYSQL_USER: MySQL に接続するユーザー名。'user' とする。
- MYSQL_PASSWORD: MySQL に接続する際のパスワード。任意のパスワードを設定する。
- MYSQL_ROOT_PASSWORD: MySQL のルートパスワード。任意のパスワードを設定する。
- WEB_ADMIN_PASSWORD: ウェブ管理者のパスワード。任意のパスワードを設定する。

この git repository を git clone する。

```bash
$ git clone https://github.com/ken-miyashita/jta-race-entry.git
```

ターミナル上で MySQL サーバーを起動する。このサーバーはずっと起動したままにしておく。

```bash
$ cd .devcontainer
$ docker-compose up
```

もう１つターミナルを開いて、以下のコマンドを実行する。

```bash
# 依存するパッケージをインストール
$ yarn

# データベースを作成
$ DATABASE_URL="mysql://root:${MYSQL_ROOT_PASSWORD}@127.0.0.1:3306/${MYSQL_DATABASE}" npx prisma migrate dev --name init
```

### 起動方法

以下のコマンドを実行する。

```bash
$ yarn dev
```

web ブラウザで http://localhost:3000 にアクセスする。これ以降の流れは、以下の github codespaces での開発の流れと同じである。

## github codespaces での開発

### 準備

以下の環境変数を github > Settings > Codespaces > Codespace user secrets の設定画面から設定する。

- MYSQL_DATABASE: MySQL のデータベース名。'mydatabase' とする。
- MYSQL_USER: MySQL に接続するユーザー名。'user' とする。
- MYSQL_PASSWORD: MySQL に接続する際のパスワード。任意のパスワードを設定する。
- MYSQL_ROOT_PASSWORD: MySQL のルートパスワード。任意のパスワードを設定する。
- WEB_ADMIN_PASSWORD: ウェブ管理者のパスワード。任意のパスワードを設定する。

![github-secrets](https://github.com/user-attachments/assets/8b65285e-75a2-481d-8888-6d158035f392)

codespaces を起動する。

![create-codespaces](https://github.com/user-attachments/assets/db0b74b9-2897-4a0e-a35e-6b2bb1b8906c)

codespaces のターミナルで以下のコマンドを実行し、データベースを作成する。

```bash
$ DATABASE_URL="mysql://root:${MYSQL_ROOT_PASSWORD}@127.0.0.1:3306/${MYSQL_DATABASE}" npx prisma migrate dev --name init
```

### 起動方法

codespaces のターミナルで以下のコマンドを実行する。

```bash
$ yarn dev
```

Web ブラウザで http://localhost:3000 にアクセスするように促されるので、ボタンを押してアクセスする。

![open-browser](https://github.com/user-attachments/assets/e56ae603-7361-4b60-9d6c-ef3a34b95da1)

ウェブ管理者のパスワードを入力する画面が表示されるので、先ほど設定したウェブ管理者のパスワードを入力する。

![admin-password](https://github.com/user-attachments/assets/ea5031be-3a62-45d5-be30-36ba3ffa3a74)

ウェブ管理者のパスワードを入力すると、ウェブ管理者のダッシュボードが表示される。

![admin-portal](https://github.com/user-attachments/assets/a9112af3-43c8-471a-ac56-ced152095c02)
