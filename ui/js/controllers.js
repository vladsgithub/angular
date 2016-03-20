myApp.run(function($rootScope){
	$rootScope.alert = 'it is $rootScope.top';
});

myApp.controller('parentController', function($scope) {
	$scope.message = 'Parent controller message';
});

myApp.controller('phoneController', function($scope, $rootScope) {
	$rootScope.fromController = 'A property of $rootScope is installed from controller';

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

myApp.controller('modeController', function($scope) {

	$scope.phones = [{
		name: 'Nokia Lumia 630',
		year: 2014,
		price: 200,
		company: 'Nokia'
	},{
		name: 'Samsung Galaxy S 4',
		year: 2014,
		price: 400,
		company: 'Samsung'
	},{
		name: 'Mi 5',
		year: 2015,
		price: 300,
		company: 'Xiaomi'
	}];
	$scope.tablets = [{
		name: 'Samsung Galaxy Tab S4',
		year: 2014,
		price: 300,
		company: 'Samsung'
	},{
		name: 'LG G PAD 8.3',
		year: 2013,
		price: 180,
		company: 'LG'
	},{
		name: 'IdeaTab A8',
		year: 2014,
		price: 220,
		company: 'Lenovo'
	}];
	$scope.data = {};
	$scope.setFile = function () {
		if($scope.data.mode=='Tablets')
			return 'tabletsList.html';
		else if($scope.data.mode=='Phones')
			return 'phoneList.html';
	};
	$scope.modes = [{
		value: 'Tablets',
		label: 'Планшеты'
	},{
		value: 'Phones',
		label: 'Смартфоны'
	}];
});

myApp.controller('styleController', function($scope) {
	$scope.somestyle = {
		background: '#eee',
		color: '#333'
	};
	$scope.someclass = "myclass";
	$scope.data = {
		visible: false
	};
});

myApp.controller('questionController', function($scope) {
	$scope.question = {
		text: 'Какой js-фреймворк лучше использовать?',
		author: 'Иван Иванов',
		date: '20/10/2013',
		answers:
			[{
				text: 'AngularJS!',
				author: 'Вова Сидоров',
				date: '11/01/2013',
				rate:1
			},{
				text: 'AngularJS лучше всех',
				author: 'Олег Кузнецов',
				date: '22/02/2014',
				rate:2
			},{
				text: 'Я бы использовал knockout',
				author: 'Неизвестный',
				date: '33/03/2015',
				rate:3
			}]
	};
	//$scope.sortparam = 'rate'; // прямой порядок
	$scope.sortparam = '-rate'; // обратный порядок

	$scope.voteUp = function (answer){
		answer.rate++;
	};
	$scope.voteDown = function (answer){
		answer.rate--;
	};
	$scope.questColorClass= "questcolor";
	$scope.changeClass = function (e) {
		$scope.questColorClass = e.type == "mouseover" ? "questselectedcolor" : "questcolor";
	}
});

myApp.controller('customFilterController', function($scope) {
	$scope.question = {
		text: 'Какой js-фреймворк лучше использовать?',
		author: 'Иван Иванов',
		date: '20/10/2013',
		answers:
			[{
				text: 'AngularJS!',
				author: 'Вова Сидоров',
				date: '20/10/2013',
				rate:2
			},{
				text: 'AngularJS лучше всех',
				author: 'Олег Кузнецов',
				date: '21/10/2013',
				rate:3
			},{
				text: 'фигасе квестшен',
				author: 'Неизвестный',
				date: '22/10/2013',
				rate:0
			}]
	};

	$scope.voteUp = function (answer){
		answer.rate++;
	};
	$scope.voteDown = function (answer){
		answer.rate--;
	};
});

myApp.controller('validationController', function($scope) {
	$scope.save = function (answer, answerForm){
		// С помощью выражения answerForm.$valid просматриваем, прошла форма валидацию или нет.
		if(answerForm.$valid){
			// действия по сохранению
			alert(answer.author + ", ваш ответ сохранен");
		}
	};
});