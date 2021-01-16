const express = require('express');
const textAndColorPairs = require('../utility/textAndColorPairs');

const router = express.Router();

/* GET main page. */
router.get('/', (req, res) => {
  // myData = { name: '名前', icon 'アイコンのパス' }
  const myData = req.cookies.mdOneMinEx;
  res.render('main', { myData, textAndColorPairs });
  res.end();
});

module.exports = router;
