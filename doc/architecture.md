# アーキテクチャ

基本的には、[Next.js Example](https://github.com/prisma/prisma-examples/tree/latest/orm/nextjs) をベースに作成している。

```
/
  |-- prisma/
  |     |-- schema.prisma
  |
  |-- src/
        |-- app/                               # サーバー上のページごとの処理
        |     |-- edit_team/                   #   チーム情報を編集
        |     |-- list_races/                  #   レース一覧
        |     |-- new_race/                    #   レースの登録
        |     |-- race/[raceId]/
        |                   |-- list_teams/    #   特定レースに参加するチーム一覧
        |                   |-- new_team/      #   特れレースへのチームの登録
        |
        |-- components/                        # クライアントの処理
        |     |-- NewRaceForm.tsx              #    レース登録フォーム
        |     |-- ...
        |     |-- DatePicker.tsx               #    日付入力
        |     |-- ...
        |
        |-- pages/api/                         # クライアントからDBを更すするためのAPI
        |           |-- new_race.ts
        |           |-- new_team.ts
        |           |-- update_team.ts
        |
        |-- lib/                               # ユーティリティなど
        |     |--　...

```
