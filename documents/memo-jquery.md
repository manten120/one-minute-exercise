# 動的に生成した要素にイベントを設定する

```js
$('動的に生成した要素の親祖先要素').on('イベント名', '.動的に生成した要素', function {
  // 処理
});
```

### ホバーイベントの場合

```js
$('動的に生成した要素の親祖先要素').on({
  'mouseenter' : function() {
    // 処理
  },
  'mouseleave' : function(){
    // 処理
  }},
  '..動的に生成した要素');
```

```js
// ES6ではキーと変数名が同一の場合、
// 省略した書き方ができる(object-shorthand)

$('動的に生成した要素の親祖先要素').on({
  mouseenter() {
    // 処理
    // $(this)を使える
  },
  mouseleave() {
    // 処理
  }},
  '..動的に生成した要素');
```

# イベントが発生した要素を取得する

`$(this)`で取得できる

```js
$('.hoge').on('click', function () {
  $(this).removeClass('.foo');
})

// 取得できない。アロー関数だとダメ
$('.hoge').on('click', () => {
  $(this).removeClass('.foo');
})
```
