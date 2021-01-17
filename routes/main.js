const express = require('express');
const menusSrc = require('../utility/menusSrc');
const stampsSrc = require('../utility/stampsSrc');
const textAndColorPairs = require('../utility/textAndColorPairs');

const router = express.Router();

/* GET main page. */
router.get('/', (req, res) => {
  // myData = { name: '名前', icon 'アイコンのパス' }
  let myData;

  if (req.user) {
    myData = {
      // eslint-disable-next-line no-underscore-dangle
      name: req.user._json.name,
      // eslint-disable-next-line no-underscore-dangle
      icon: req.user._json.profile_image_url_https,
    };
  } else if (req.cookies.mdOneMinEx) {
    myData = req.cookies.mdOneMinEx;
  } else {
    res.redirect('/');
  }

  res.render('main', { myData, menusSrc, stampsSrc, textAndColorPairs });
  res.end();
});

module.exports = router;
