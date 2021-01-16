const express = require('express');
const menusSrc = require('../utility/menusSrc');
const stampsSrc = require('../utility/stampsSrc');
const textAndColorPairs = require('../utility/textAndColorPairs');

const router = express.Router();

/* GET main page. */
router.get('/', (req, res) => {
  // myData = { name: '名前', icon 'アイコンのパス' }
  const myData = req.cookies.mdOneMinEx;
  res.render('main', { myData, menusSrc, stampsSrc, textAndColorPairs });
  res.end();
});

module.exports = router;
