const express = require('express');

const router = express.Router();

/* クッキーを用いた簡易ログイン */
router.post('/', (req, res) => {
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
