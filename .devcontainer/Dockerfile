FROM mcr.microsoft.com/devcontainers/javascript-node:20

# 追加のパッケージをインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends default-mysql-client