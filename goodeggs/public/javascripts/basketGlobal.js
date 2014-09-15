// Product Basket list data array for filling in info box
var basketListData = [];

$(document).ready(function(){

	populateBasketTable('ALL');

	$('#btnUpdateProduct').hide();

	// Productname link click
	$('#basketList table tbody').on('click', 'td a.linkshowproduct', showProductInfo);
	
	$('#basketList table tbody').on('click', 'td a.linkremoveproduct', removeProduct);

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
function populateBasketTable(type) {

	// Empty content string
	var tableContent = '';
    
	// Build Url Based on type
    var getUrl = '/basket/products';
    if(type !== 'ALL'){
       getUrl += '/'+type;
    }
  
	// jQuery AJAX call for JSON
	$.getJSON(getUrl, function (data) {

		// Stick our user data array into a userlist variable in the global object
		basketListData = data;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data,function(){
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowproduct" rel="' + this.name+ '" title="Show Details">' + this.name + '</a></td>';
			tableContent += '<td><a href="#" class="linkremoveproduct" rel="' + this._id + '">remove</a></td>';
			tableContent += '<td><input style="width:20px;" type="text" value="0"></input></td>';
			tableContent += '</tr>';
		});

		// Inject the whole content string into our existing HTML table
		$('#basketList table tbody').html(tableContent);
	});
}


// Show User Info
function showProductInfo(event) {

	// Prevent Link from Firing
	event.preventDefault();

	// Retrieve username from link rel attribute
	var thisProductName = $(this).attr('rel');

	// Get Index of object based on id value
	var arrayPosition = basketListData.map(function(arrayItem) { 
		return arrayItem.name;
	}).indexOf(thisProductName);

	// Get our User Object 
	var thisProductObject = basketListData[arrayPosition];

	// Populate Info Box
	$('#productInfoName').text(thisProductObject.name);
	$('#productInfoType').text(thisProductObject.type);
	$('#productInfoFarmer').text(thisProductObject.farmer);
	$('#productInfoPrice').text('$'+thisProductObject.price);
}


// Remove Product From Basket
function removeProduct(event){

	// Prevent Link from Firing
	event.preventDefault();

	// Pop up a confirmation dialog 
	var confirmation = confirm("Are you sure you want to remove this product from basket");

	// Check and make sure the user confirmed
	if(confirmation === true) {

		var productIDToBeDeleted = $(this).attr('rel');

		$.ajax({
			type: 'DELETE',
			url:'/basket/removeProduct/'+ productIDToBeDeleted
		}).done(function(response){

			// Check for a successfull (blank) response
			if (response.msg === '') {

			}
			else {
				alert('Error: ' + response.msg);
			}

			// Update the table
			populateBasketTable('ALL');

		});

	}

}





