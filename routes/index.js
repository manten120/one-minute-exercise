const express = require('express');
const iconsSrc = require('../utility/iconsSrc');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { iconsSrc });
});

module.exports = router;
