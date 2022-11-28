var app = angular.module("productModule", []);

app.controller("productController", function($scope, $http) {
	
	$scope.products = [];
	$scope.productForm = {
		productId :1,
		productName: "",
		productType:"",
		price:0.0
	};
	
	_refreshProductData();
	
	$scope.submitProduct = function() {

        var method = "";
        var url = "";

        if ($scope.productForm.productId == -1) {
            method = "POST";
            url = '/products';
        }

        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.productForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_success, _error);
    };
    
    $scope.deleteProduct = function(product) {
        $http({
            method: 'DELETE',
            url: '/product/' + product.productId
        }).then(_success, _error);
    };

 
    $scope.editProduct = function(product) {
		
        $scope.productForm.productId = product.productId;
        $scope.productForm.productName = product.productName;
        $scope.productForm.productType = product.productType;
        $scope.productForm.price = product.price;
        
    };
    
    $scope.createProduct = function() {
        _clearFormData();
    }
	
	function _refreshProductData() {
        $http({
            method: 'GET',
            url: '/products'
        }).then(
            function(res) { // success
                $scope.products = res.data;
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }
    
    function _success(res) {
        _refreshProductData();
        _clearFormData();
    }

    function _error(res) {
        var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
        alert("Error: " + status + ":" + data);
    }
    
    // Clear the form
    function _clearFormData() {
        $scope.productForm.productId = -1;
        $scope.productForm.productName = "";
        $scope.productForm.productType = "";
        $scope.productForm.price = 0.0;
    };

	
});