const express = require('express');

const router = express.Router();

/* Twitterアカウントでログイン */
router.get('/', (req, res) => {
  const mdOneMinEx = {
    // eslint-disable-next-line no-underscore-dangle
    name: req.user._json.name,
    // eslint-disable-next-line no-underscore-dangle
    icon: req.user._json.profile_image_url_https,
  };

  // cookieの有効日数
  const cookieExpireDays = 30;
  // ミリ秒単位に換算
  const cookieExpireDaysMs = cookieExpireDays * 24 * 60 * 60 * 1000;

  res.cookie('mdOneMinEx', mdOneMinEx, { maxAge: cookieExpireDaysMs });
  res.redirect('/main');
});

module.exports = router;
