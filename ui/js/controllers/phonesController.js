var myApp = angular.module('myApp', ['ngSanitize']); // creation of the myApp module

myApp.run(function($rootScope){
	$rootScope.alert = 'it is $rootScope.top';
});

myApp.controller('parentController', function($scope) {
	$scope.message = 'Parent controller message';
});

myApp.controller('phoneController', function($scope) {
	$scope.phone = {
		name: 'Nokia Lumia 630',
		price: 200,
		company: {
			name: 'Nokia',
			country: 'Финляндия'
		}
	};

	$scope.items = [10, 20, 30, 40, 50];

	this.text="Без использования $scope";
});

myApp.controller('bindController', function($scope) {
	$scope.phones = [
		{
			name: 'Nokia Lumia 630',
			year: 2014,
			price: 200,
			company: {
				name: 'Nokia',
				country: 'Финляндия'
			}
		},
		{
			name: 'Samsung Galaxy S 4',
			year: 2014,
			price: 400,
			company: {
				name: 'Samsung',
				country: 'Республика Корея'
			}
		},
		{
			name: 'Mi 5',
			year: 2015,
			price: 300,
			company: {
				name: 'Xiaomi',
				country: 'Китай'
			}
		}
	];

	$scope.htmlcode="Директива <b>ng-bind-html</b>";
});