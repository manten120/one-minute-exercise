このファイルは開発時のnpm packageに関するメモです

# 各パッケージの役割

| パッケージ名 | 役割 |
| --- | --- | 
| prettier | ソースコードを整形 |
| eslint | バクチェックとコーディングスタイルを保つ |
| eslint-config-prettier | ESLintとPrettierを併用する際に必要 |
| eslint-config-airbnb-base | ESLintでairbnbのコードスタイルを適用する |
| husky | Gitコマンドをフックに別のコマンドを呼び出せる |
| lint-staged v| commitしたファイルにlintを実行する |
| bootstrap | スタイルをつける |
| jquery | bootstrapに必要。DOM操作など |
| popper.js | bootstrapに必要 |
| webpack | 複数のJSファイルを1ファイルにまとめる |
| webpack-cli | webpackコマンドでwebpackを実行する --watchオプションでコード変更時に自動で実行|
| @babel/core | モダンなJavaScriptやjQueryなどをブラウザで読み込めるバージョンのJavaScriptに変換する |
| @babel/preset-env | 変換するバージョンを指定するプリセット。デフォルトはes5 |
| babel-loader | webpackでbabelを使用する |
| nodemon | コード変更時に自動でサーバーを再起動する。仮想環境で使用する場合--legacy-watchオプションが必要 |
| helmet | 脆弱性対策 <br/>[参考: Express×Helmetでウェブセキュリティを学ぶ](https://qiita.com/qianer-fengtian/items/148602c437e1703aa764) |
| passport | Twitterアカウントでログイン |
| passport-twitter | Twitterアカウントでログイン |
| socket.io | リアルタイム通信。サーバーで使用 |
| socket.io-client | リアルタイム通信。クライアント側で使用 |
| moment-timezone | タイムゾーンとフォーマットを指定して時刻を取得する |
| jest | テスト |
| supertest | テスト時に使用。Routerの挙動をテスト |
| passport-staged | テスト時にTwitterログインをシミュレート |
