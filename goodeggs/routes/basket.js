var express = require('express');
var router = express.Router();


// Get Current Basket Products From basket's List
router.get('/products',function(req,res) {
    var db = req.db;
    var productType = req.params.type;
    db.collection('basket').find().toArray(function (err,items) {
        res.json(items);
    });
});

// Get Product By Type
router.get('/productsList/:type',function(req,res){
  var db = req.db;
  var productType = req.params.type;
  db.collection('products').find({type:productType}).toArray(function (err,items){
    res.json(items)
  });
});


// Add Product To Basket
router.post('/addProduct',function(req,res) {
    var db = req.db;
    //db.collection('basket').find( { name: { $exists: true, $nin: [ productObject.name ] } } ;
    db.collection('basket').insert(req.body,function(err,result){
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
});


// Delete Product From Basket
router.delete('/removeProduct/:id',function(req,res){
  var db = req.db;
  db.collection('basket').removeById(req.params.id,function(err,result) {
    res.send((result === 1) ? { msg: '' } : { msg: 'error:' + err });
  });
});


module.exports = router;