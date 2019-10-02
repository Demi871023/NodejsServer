var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('The server is listening on port 3000');
  res.send('<h1>Server<h1>');
});

module.exports = router;
