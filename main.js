function getAllProductsWithTag(tag, onComplete) {
  var productsWithTag = [];
  getAllProducts(function (products) {
    for(var i=0; i<products.length; i++) {
       var p = products[i];
      if(p.tags.includes(tag)) {
       	productsWithTag.push(p); 
      }
    }
    
    if(typeof onComplete == "function") {
     	onComplete(productsWithTag); 
    }
  });
}

function getAllProducts(onComplete) {
  var products = [];
  getAllProductsFromPage(products, 1, onComplete);
}
  
function getAllProductsFromPage(products, it = 1, onComplete) {
  $.ajax({
    url: 'https://hearingaidhero.myshopify.com/products.json?limit=250&page='+ it,
    type: 'GET',
    dataType: 'json',
    success: function(res) {
      console.log(res);
      for(var i = 0; i < res.products.length; i++) {
        var product = res.products[i];
        products.push(product);
      }
      
      if(res.products.length === 250) {
        getAllProducts(products, it + 1, onComplete);
      } else if(res.products.length < 250) {
        if(typeof onComplete == 'function') {
          onComplete(products);
        }
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}



(function($) {
	getAllProducts(function (products) {
    console.log("im done loading products:", products);
  });
  
  getAllProductsWithTag("oticon", function (products) {
    console.log("========================================================");
    console.log("im done loading products with tags:", products);
  });
}(window.$ || window.jQuery));
