var express = require('express');
var router = express.Router();

// Import Mongo DB Implementation
//$.getScript("/javascripts/db_mongo.js")


router.get('/productsList/:type',function(req,res){
  var db = req.db;
  var productType = req.params.type;
  db.collection('products').find({type:productType}).toArray(function (err,items){
    res.json(items)
  });
});

// Get Products From Product's List
router.get('/productsList',function(req,res) {
  	var db = req.db;
    var productType = req.params.type;
    db.collection('products').find().toArray(function (err,items) {
  		  res.json(items);
    });
});



module.exports = router;
