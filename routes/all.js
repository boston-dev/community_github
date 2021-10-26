const express = require('express');
const router = express.Router();
const controller = require('../mongod/controller');
const config= require('../mongod/config');

let sitemap
/* GET home page. */
router.get('*', async (req, res, next) => {
   res.render('index');
});


module.exports = router;
