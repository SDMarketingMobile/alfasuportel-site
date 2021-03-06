var app = angular.module('alfasuportel', []);
app.controller('indexController', function($scope, $http){

	// Menu Header
 
	$scope.loadCategorias = function() {
		$scope.categorias = [];
		$scope.subcategorias = [];

		$http.get(baseUrlApi()+"categorias/treeview?tce->id_empreendimento=217").then(function(response){
			$scope.categorias = response.data;
		}, function(err){
			console.log(err);
		});
	};

	$scope.loadSubCategorias = function(item){
		$scope.subcategorias = [];
		if (item.filhos != null) {
			$scope.subcategorias = item.filhos
		}
	};
	
	// Load Category Body

	$scope.loadCategoriasBody = function() {
		$scope.categorias_body = [];

		$http.get(baseUrlApi()+"categorias/treeview?tce->id_empreendimento=217").then(function(response){
			$scope.categorias_body = response.data;
			angular.forEach($scope.categorias_body,function(item,index){
				item.banner = item.pth_banner.substring(item.pth_banner.indexOf('assets'), item.pth_banner.length);
				angular.forEach(item.filhos, function(item,index){
					item.thumbnail = item.pth_thumbnail.substring(item.pth_thumbnail.indexOf('assets'), item.pth_thumbnail.length);	
				})
			})
		}, function(err){
			console.log(err);
		});
	};

	$scope.loadCategorias();
	$scope.loadCategoriasBody();


	$scope.loadInstagramFeed = function() {
		$scope.instagram_feed = {};
		$http({
			method: 'GET',
			url: 'http://186.226.56.5:1972/external/instagram/feed'
		}).then(
			function successCallback(response) {
				$scope.instagram_feed = response.data;
			},
			function erroCallback(response){
				$scope.instagram_feed = null;
			});
	}

	$scope.loadInstagramFeed();

});