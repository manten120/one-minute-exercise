![キャプチャ](https://user-images.githubusercontent.com/61675236/106231929-2b59e600-6236-11eb-89d6-8a087589b258.JPG)

### サイト「 強制!!１分間エクササイズ 」のリポジトリです

![Deploy](https://github.com/manten120/one-minute-exercise/workflows/Deploy/badge.svg)
![Test](https://github.com/manten120/one-minute-exercise/workflows/Test/badge.svg)

<br/>

## 🌐 SITE URL

#### **https://rocky-basin-37839.herokuapp.com**

<br/>

## 💻 Chrome拡張機能

サイトをより便利に使うためのChrome拡張機能もあります

#### [GitHubリポジトリ](https://github.com/manten120/one-minute-exercise-chrome-extension)

#### [インストール( chrome ウェブストアへ移動 )](https://chrome.google.com/webstore/detail/%E5%BC%B7%E5%88%B61%E5%88%86%E9%96%93%E3%82%A8%E3%82%AF%E3%82%B5%E3%82%B5%E3%82%A4%E3%82%BA/hgocnapfpahehjogcjfchlbidfidiooc?hl=ja)

<br/>

## 🔧 技術的な特徴

- SocketIoを用いたユーザー同士のリアルタイムコミュニケーション
- 過疎時に寂しくないようNPC(bot?)が常駐

![npc](https://user-images.githubusercontent.com/61675236/106242552-3408e700-624b-11eb-8318-3f0cfc998ae8.JPG)

<br/>

## 📄 開発用コマンド

```
$ yarn dev
```

- http://localhost:8000 で開発サーバを開始
- appディレクトリのJSファイルを書き換え保存したときwebpackでpublic/javascsripts/bundle.jsにオートビルド
- その他JSファイルを書き換え保存したとき自動でサーバー再起動


```
$ yarn lint-fix
```

- jsファイルのコード整形。git commit したときにも自動で行われる。

```
$ yarn test
```

- テストを実行
- git push したときと mainブランチにプルリクエストしたときにも GitHub Actions で行われる

<br/>

## 🏁 デプロイ

main ブランチにマージしたとき GitHub Actions で自動的に Heroku にデプロイされる

<br/>

## その他

`.vscode/`にvscode用の設定ファイルを用意してるのでコードエディタはvscodeをおすすめします

コンテスト提出期限直前に CircleCI との連携がうまくいかなくなってしまったため( [同じ症状の方を発見。こちらで解決方法を募集しています](https://teratail.com/questions/319236) )、CI/CDツールを GitHub Actions に移行しました


そのほか開発時の設計・メモなどは [/documents](https://github.com/manten120/one-minute-exercise/tree/main/documents) に
