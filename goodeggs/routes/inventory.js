var express = require('express');
var router = express.Router();


// Get Products By Type
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


// AddProduct to Products list
router.post('/addProduct',function(req,res) {
  	var db = req.db;
  	db.collection('products').insert(req.body,function(err,result){
  	    res.send((err === null) ? { msg: '' } : { msg: err });
  });
});

// Delete Product
router.delete('/deleteProduct/:id',function(req,res){
	var db = req.db;
	var productToDelete = req.params.id;
	db.collection('products').removeById(productToDelete,function(err,result) {
		res.send((result === 1) ? { msg: '' } : { msg: 'error:' + err });
	});
});


// Update Product 
router.put('/updateProduct',function(req,res){
	var db = req.db;
	var productObject = req.body;
  db.collection('products').update({name:productObject.name}, {$set:{type: productObject.type,farmer:productObject.farmer,price:productObject.price}}, function(err,result) {
        res.send((result === 1) ? { msg: '' } : { msg: 'error:' + err });
  });
});





module.exports = router;
