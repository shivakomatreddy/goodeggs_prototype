// Product list data array for filling in info box
var productListData = [];

$(document).ready(function(){

	populateTable('ALL');


	$('#btnUpdateProduct').hide();

	// Productname link click
	$('#productList table tbody').on('click', 'td a.linkshowproduct', showProductInfo);

	// Add Product Link Click
	$('#productList table tbody').on('click', 'td a.linkaddproducttocart', addProductToBasket);
	
	// View Everything btn click
	$('#btnViewAllProducts').on('click',function(){
		populateTable('ALL');
	});

	// View Fruits btn click
	$('#btnViewAllFruits').on('click',function(){
		populateTable('Fruit');
	});

	// View Vegetables btn click
	$('#btnViewAllVegetables').on('click',function(){
		populateTable('Vegetable');
	});
    
    // View Vegetables btn click
	$('#btnViewAllMeats').on('click',function(){
		populateTable('Meat');
	});

});
// Functions ===============================================

// Fill table with data 
function populateTable(type) {

	// Empty content string
	var tableContent = '';

	// Build Url Based on type
    var getUrl = '/market/productsList';
    if(type !== 'ALL'){
       getUrl += '/'+type;
    }

	// jQuery AJAX call for JSON
	$.getJSON(getUrl, function (data) {

		// Stick our user data array into a userlist variable in the global object
		productListData = data;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data,function(){
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowproduct" rel="' + this.name+ '" title="Show Details">' + this.name + '</a></td>';
			tableContent += '<td>$' + this.price + '</td>';
			tableContent += '<td><input type="text"/>';
			tableContent += '<td><a href="#" class="linkaddproducttocart" rel="'+ this.name+'">add cart</a></td>';
			tableContent += '</tr>';
		});

		// Inject the whole content string into our existing HTML table
		$('#productList table tbody').html(tableContent);
	});
}

// Show User Info
function showProductInfo(event) {

	// Prevent Link from Firing
	event.preventDefault();

	// Retrieve username from link rel attribute
	var thisProductName = $(this).attr('rel');

	// Get Index of object based on id value
	var arrayPosition = productListData.map(function(arrayItem) { 
		return arrayItem.name;
	}).indexOf(thisProductName);

	// Get our User Object 
	var thisProductObject = productListData[arrayPosition];

	// Populate Info Box
	$('#productInfoName').text(thisProductObject.name);
	$('#productInfoType').text(thisProductObject.type);
	$('#productInfoFarmer').text(thisProductObject.farmer);
	$('#productInfoPrice').text('$'+thisProductObject.price);
}


// Add Product To Basket
function addProductToBasket(event){

	// Prevent Link from Firing
	event.preventDefault();

	// Retrieve username from link rel attribute
	var thisProductName = $(this).attr('rel');

	// Get Index of object based on id value
	var arrayPosition = productListData.map(function(arrayItem) { 
		return arrayItem.name;
	}).indexOf(thisProductName);

	// Get our Product Object 
	var thisProductObject = productListData[arrayPosition];

	$.ajax({
            type: 'POST',
            data: thisProductObject,
            url: '/basket/addProduct',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                alert("Add Product successful");
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
    	});
}






