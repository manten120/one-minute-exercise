const express = require('express');

const router = express.Router();

/* GET main page. */
router.get('/', (req, res) => {
  // myData = { name: '名前', icon 'アイコンのパス' }
  const myData = req.cookies.mdOneMinEx;
  res.render('main', { myData });
  res.end();
});

module.exports = router;
