const express = require('express');
const { iconsSrc } = require('../utility/icons');
const { CHROME_EXTENSION_STORE_URL } = require('../utility/const');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { iconsSrc, CHROME_EXTENSION_STORE_URL });
});

module.exports = router;
