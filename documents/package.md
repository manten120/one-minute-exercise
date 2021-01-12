# 各パッケージの役割

| パッケージ名 | 役割 |
| --- | --- | 
| prettier | ソースコードを整形 |
| eslint | バクチェックとコーディングスタイルを保つ |
| eslint-config-prettier | ESLintとPrettierを併用する際に必要 |
| eslint-config-airbnb-base | ESLintでairbnbのコードスタイルを適用する |
| husky | Gitコマンドをフックに別のコマンドを呼び出せる |
| lint-staged | commitしたファイルにlintを実行する |
| bootstrap | スタイルをつける |
| jquery | bootstrapに必要。DOM操作など |
| popper.js | bootstrapに必要 |
| webpack | 複数のJSファイルを1ファイルにまとめる |
| webpack-cli | webpackコマンドでwebpackを実行する --watchオプションでコード変更時に自動で実行|
| @babel/core | モダンなJavaScriptやjQueryなどをブラウザで読み込めるバージョンのJavaScriptに変換する |
| @babel/preset-env | 変換するバージョンを指定するプリセット。デフォルトはes5 |
| babel-loader | webpackでbabelを使用する |
| nodemon | コード変更時に自動でサーバーを再起動する。仮想環境で使用する場合--legacy-watchオプションが必要 |

