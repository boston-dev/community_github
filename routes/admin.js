const express = require('express');
const router = express.Router();
const controller = require('../mongod/controller');
const config= require('../mongod/config');

/* GET home page. */
router.get('/me', async (req, res, next) => {
   res.render('me');
});


module.exports = router;
