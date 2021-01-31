const express = require('express');
const moment = require('moment-timezone');
const { stampsKeyAndSrcPairs } = require('../utility/stamps');
const { textsKeyTextAndBtnColorObjects } = require('../utility/texts');
const { getRandomMenusKeyAndSrcPairs } = require('../utility/menus');
const { CHROME_EXTENSION_STORE_URL } = require('../utility/const');

const router = express.Router();

let randomMenus;
let isCoolDownTime = false;

/* GET main page. */
router.get('/', (req, res) => {
  // myData = { name: '名前', icon 'アイコンのパス' }
  let myData;

  if (req.cookies.mdOneMinEx) {
    myData = req.cookies.mdOneMinEx;
  } else {
    res.redirect('/#login');
  }

  // アクセス時に表示される6種のエクササイズメニューを決定し
  // その後１分間ほかのユーザーがアクセスしたときにもそのメニューを表示する
  if (!isCoolDownTime) {
    randomMenus = getRandomMenusKeyAndSrcPairs(6);
    isCoolDownTime = true;
    setTimeout(() => {
      isCoolDownTime = false;
    }, 60000);
  }

  const hour = moment().tz('Asia/Tokyo').format('H');

  let aisatsu;
  if (hour <= 3) {
    aisatsu = 'こんばんは';
  } else if (hour <= 9) {
    aisatsu = 'おはようございます';
  } else if (hour <= 17) {
    aisatsu = 'こんにちは';
  } else if (hour <= 23) {
    aisatsu = 'こんばんは';
  }

  res.render('main', {
    myData,
    randomMenus,
    stampsKeyAndSrcPairs,
    textsKeyTextAndBtnColorObjects,
    aisatsu,
    CHROME_EXTENSION_STORE_URL,
  });
  res.end();
});

module.exports = router;
