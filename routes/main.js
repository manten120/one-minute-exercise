const express = require('express');
const { stampsKeyAndSrcPairs } = require('../utility/stamps');
const { textsKeyTextAndBtnColorObjects } = require('../utility/texts');
const { getRandomMenusKeyAndSrcPairs } = require('../utility/menus');

const router = express.Router();

let randomMenus;
let isCoolDownTime = false;

/* GET main page. */
router.get('/', (req, res) => {
  let isTwitterOauth = false;

  // myData = { name: '名前', icon 'アイコンのパス' }
  let myData;

  if (req.user) {
    isTwitterOauth = true;
    myData = {
      // eslint-disable-next-line no-underscore-dangle
      name: req.user._json.name,
      // eslint-disable-next-line no-underscore-dangle
      icon: req.user._json.profile_image_url_https,
    };
  } else if (req.cookies.mdOneMinEx) {
    myData = req.cookies.mdOneMinEx;
  } else {
    res.redirect('/#login');
  }

  if (!isCoolDownTime) {
    randomMenus = getRandomMenusKeyAndSrcPairs(6);
    isCoolDownTime = true;
    setTimeout(() => {
      isCoolDownTime = false;
    }, 30000);
  }

  const hour = new Date(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })).getHours();
  console.log('hour: ', hour);
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
    isTwitterOauth,
    myData,
    randomMenus,
    stampsKeyAndSrcPairs,
    textsKeyTextAndBtnColorObjects,
    aisatsu,
  });
  res.end();
});

module.exports = router;
