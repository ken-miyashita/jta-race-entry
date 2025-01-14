# ベースイメージの指定
FROM node:14

# 作業ディレクトリの作成
WORKDIR /app

# パッケージのインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションのビルド
RUN npm run build

# アプリケーションの起動
CMD [ "npm", "start" ]
