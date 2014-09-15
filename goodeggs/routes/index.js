var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Good Eggs' });
});

/* GET admin inventory page. */
router.get('/view/inventory', function(req, res) {
  res.render('inventory', { title: 'Market inventory' });
});


/* GET market listing page. */
router.get('/view/market', function(req, res) {
  res.render('market', { title: 'Market Place' });
});


/* GET basket listing page. */
router.get('/view/basket', function(req, res) {
  res.render('basket', { title: 'User Basket' });
});

module.exports = router;
