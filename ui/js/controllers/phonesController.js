var myApp=angular.module('myApp'); // getting of the myApp module is created early (without empty array [])

myApp.controller('phoneController', function($scope) {

	$scope.phone = {
		name: 'Nokia Lumia 630',
		year: 2014,
		price: 200,
		company: {
			name: 'Nokia',
			country: 'Финляндия'
		}
	}
});