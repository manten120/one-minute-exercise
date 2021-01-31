const express = require('express');

const router = express.Router();

/* 通常ログイン */
router.post('/', (req, res) => {
  // ログイフォームに入力された名前の文字数が不正であるとき
  if (req.body.name.length === 0 || req.body.name.length > 10) {
    res.redirect('/');
  }
  // ログイフォームで選択したアイコン画像のURLが不正であるとき
  if (!req.body.icon.startsWith('images/icons/')) {
    res.redirect('/');
  }

  const mdOneMinEx = {
    name: req.body.name,
    icon: req.body.icon,
  };

  // cookieの有効日数
  const cookieExpireDays = 30;
  // ミリ秒単位に換算
  const cookieExpireDaysMs = cookieExpireDays * 24 * 60 * 60 * 1000;

  res.cookie('mdOneMinEx', mdOneMinEx, { maxAge: cookieExpireDaysMs });
  res.redirect('/main');
});

module.exports = router;
