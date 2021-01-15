const express = require('express');

const router = express.Router();

/* GET main page. */
router.get('/', (req, res) => {
  const u = {
    name: '太郎',
    id: 'hogehoge',
    icon: '.foo.jpg',
  };
  const uJson = encodeURI(JSON.stringify(u));
  console.log(decodeURI(uJson));

  const cookieExpireDays = 30;
  const nowDate = new Date();
  nowDate.setTime(nowDate.getTime() + cookieExpireDays * 24 * 60 * 60 * 1000);
  const cookieExpireDate = nowDate.toGMTString();

  res.setHeader('Set-Cookie', `last_access=${uJson};expires=${cookieExpireDate};`);
  res.render('main', { title: 'Express' });
});

module.exports = router;
