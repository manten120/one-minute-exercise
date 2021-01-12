# modalウインドウ

## モーダルウインドウをデフォルトで表示する

モーダルの最上位のdiv要素に下のスタイル属性を持たせる

```css
style="display: block;"
```

jQueryで.modal('show')メソッドを使う

```js:
$('#modalLong').modal('show');
```

## クリックでモーダルを閉じる要素を作る

データ属性`data-dismiss="modal"`を持たせるとクリックでモーダルを閉じる要素になる



## モーダルの外側をクリックしてもモーダルを閉じないようにする

モーダルの最上位のdiv要素にデータ属性`data-backdrop="static"`を持たせる

## escキーでモーダルを閉じないようにする

モーダルの最上位のdiv要素にデータ属性`"data-keyboard="false"`を持たせる

