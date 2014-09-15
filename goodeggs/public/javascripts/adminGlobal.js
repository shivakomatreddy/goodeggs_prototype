// Product list data array for filling in info box
var productListData = [];


$(document).ready(function(){

	populateTable('ALL');

	$('#btnUpdateProduct').hide();

	// Productname link click
	$('#inventoryProductList table tbody').on('click', 'td a.linkshowproduct', showProductInfo);

	// Add Product btn is click
	$('#btnAddProduct').on('click', addProduct);

	// Delete Product link click
	$('#inventoryProductList table tbody').on('click', 'td a.linkdeleteproduct', deleteProduct);

	// Edit Product link click
	$('#inventoryProductList table tbody').on('click', 'td a.linkeditproduct', editProductInfo);

	// Add Product link click
	//$('#inventoryProductList table tbody').on('click', 'td a.linkaddproduct', addProductToBasket);

	// Update Product btn click
	$('#btnUpdateProduct').on('click',updateProduct);

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
    var getUrl = '/inventory/productsList';
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
			tableContent += '<td><a href="#" class="linkdeleteproduct" rel="' + this._id + '">delete</a></td>';
			tableContent += '<td><a href="#" class="linkeditproduct" rel="'+ this.name+'">edit</a></td>';
			tableContent += '</tr>';
		});

		// Inject the whole content string into our existing HTML table
		$('#inventoryProductList table tbody').html(tableContent);
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


function editProductInfo(event){

   event.preventDefault();

   // Retrieve product name from link rel attribute
	var thisProductName = $(this).attr('rel');

	// Get Index of object based on id value
	var arrayPosition = productListData.map(function(arrayItem) { 
		return arrayItem.name;
	}).indexOf(thisProductName);
    
	// Get our Product Object 
	var thisProductObject = productListData[arrayPosition];

	$('#productFormTitle').text('Edit Product')

    // Populate Forum Box
    $('#inputProductName').val(thisProductObject.name);
    $('#inputProductType').val(thisProductObject.type);
    $('#inputProductFarmer').val(thisProductObject.farmer);
    $('#inputProductPrice').val(thisProductObject.price);
    
    

	// Populate Info Box
	$('#productInfoName').text(thisProductObject.name);
	$('#productInfoType').text(thisProductObject.type);
	$('#productInfoFarmer').text(thisProductObject.farmer);
	$('#productInfoPrice').text('$'+thisProductObject.price);


	$('#btnUpdateProduct').show();

	$('#btnAddProduct').hide();

}


function updateProduct(event){
	// Prevent Link from Firing
	event.preventDefault();

	// Super basic validation - increase errorcount variable if any fields are blank
	var errorCount = 0;
    $('#addProduct input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0){
    	// If it is, compile all user info into one object
		var updatedProduct = {
            'name': $('#addProduct fieldset input#inputProductName').val(),
            'type': $('#addProduct fieldset input#inputProductType').val(),
            'farmer': $('#addProduct fieldset input#inputProductFarmer').val(),
            'price': $('#addProduct fieldset input#inputProductPrice').val()

        }

		// Ajax request to update product info
		$.ajax({
			type: 'PUT',
			data: updatedProduct,
	        url: '/inventory/updateProduct/',
	        dataType: 'JSON'
		}).done(function( response ){
			if (response.msg === '') {
		   	   // Clear the form inputs
		       $('#addProduct fieldset input').val('');

		       // Update the table
		       populateTable('ALL');

		       // Hide update btn and show Add button
		       $('#productFormTitle').text('Add User');
			   $('#btnUpdateProduct').hide();
			   $('#btnAddProduct').show();

	        }
	        else {
	            // If something goes wrong, alert the error message that our service returned
	            alert('Error: ' + response.msg);
	        }
		});

    }
    else {
    	// If errorcount is more than 0, error out
		alert('Please fill in all fields');
		return false;
    }
}


// Add a product
function addProduct(event) {

	// Prevent Link from Firing
	event.preventDefault();

	// Super basic validation - increase errorcount variable if any fields are blank
	var errorCount = 0;
    $('#addProduct input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still is zero
	if(errorCount === 0){

		// If it is, compile all user info into one object
		var newProduct = {
            'name': $('#addProduct fieldset input#inputProductName').val(),
            'type': $('#addProduct fieldset input#inputProductType').val(),
            'farmer': $('#addProduct fieldset input#inputProductFarmer').val(),
            'price': $('#addProduct fieldset input#inputProductPrice').val()

        }

        // Use AJAX to post the object to our addproduct service
        $.ajax({
            type: 'POST',
            data: newProduct,
            url: '/inventory/addproduct',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addProduct fieldset input').val('');

                // Update the table
                populateTable('ALL');

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });

    }
    else {
		// If errorcount is more than 0, error out
		alert('Please fill in all fields');
		return false;
	}

}

// Delete a Product 
function deleteProduct(event){

	// Prevent Link from Firing
	event.preventDefault();

	// Pop up a confirmation dialog 
	var confirmation = confirm("Are you sure you want to delete this user");

	// Check and make sure the user confirmed
	if(confirmation === true) {

		var productIDToBeDeleted = $(this).attr('rel');

		$.ajax({
			type: 'DELETE',
			url:'/inventory/deleteProduct/'+ productIDToBeDeleted
		}).done(function(response){

			// Check for a successfull (blank) response
			if (response.msg === '') {

			}
			else {
				alert('Error: ' + response.msg);
			}

			// Update the table
			populateTable('ALL');

		});

	}

}


