const express = require('express');
const router = express.Router();
const axios = require('axios');

const upload = require('multer')();
const Ajv = require('ajv');
const ajv = new Ajv();

router.get('/', (req, res) => {
  res.render('personalCabinet', { title: 'Personal Cabinet'});
});

module.exports = router;
