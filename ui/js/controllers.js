//-----------------------------------------------------------------------------------------------------------------
//Контроллер - координатор между представлением (view) и моделью (model), в этом случае логики в нем будет минимум.
//Контроллеры не должны осуществлять манипуляции с DOM или содержать DOM селекторы
//-----------------------------------------------------------------------------------------------------------------

//Контроллеры не должны осуществлять манипуляции с DOM или содержать DOM селекторы, для это существуют директивы.
//	Точно также и бизнес-логика должна находиться в сервисах. Данные также должны храниться в сервисах
//(за исключением случаев когда данные привязаны к $scope), поскольку сервисы, в отличие от контроллеров, это синглтоны,
//	чье время жизни совпадает со временем жизни самого приложения. При разработке контроллеров лучше всего следовать
//принципу единственной ответственности (SRP) и считать контроллер координатором между представлением и моделью,
//	в этом случае логики в нем будет минимум.


myApp.controller('parentController', ['$scope', function($scope) {
	$scope.message = 'Parent controller message';
}]);

myApp.controller('phoneController', ['$scope', '$rootScope', function($scope, $rootScope) {
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
}]);

myApp.controller('bindController', ['$scope', function($scope) {
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
}]);

myApp.controller('modeController', ['$scope', function($scope) {

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
}]);

myApp.controller('styleController', ['$scope', function($scope) {
	$scope.somestyle = {
		background: '#eee',
		color: '#333'
	};
	$scope.someclass = "myclass";
	$scope.data = {
		visible: false
	};
}]);

myApp.controller('questionController', ['$scope', function($scope) {
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
}]);

myApp.controller('customFilterController', ['$scope', function($scope) {
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
}]);

myApp.controller('validationController', ['$scope', function($scope) {
	$scope.save = function (answer, answerForm) {
		// С помощью выражения answerForm.$valid просматриваем, прошла форма валидацию или нет.
		if(answerForm.$valid){
			// действия по сохранению
			alert(answer.author + ", ваш ответ сохранен");
		}
	};
}]);

myApp.controller('dataServiceController', ['$scope', 'dataService', function($scope, dataService) {
	// dataService - под таким названием был создан сервис (в файле services.js), который обеспечивает этот контроллер данными
	$scope.question = dataService.question;

	$scope.voteUp = function (answer){
		answer.rate++;
	};
	$scope.voteDown = function (answer){
		answer.rate--;
	};
}]);

myApp.controller('moduleServiceController', ['$scope', 'questionService', function ($scope, questionService) {
	$scope.question = questionService.question;

	$scope.voteUp = function (answer){
		answer.rate++;
	};
	$scope.voteDown = function (answer){
		answer.rate--;
	};
}]);

myApp.controller("domServiceController", ['$scope', '$window', '$document', function($scope, $window, $document) {
	console.log('Title of this page (native):', document.title);
	console.log('Title of this page (angular):', $document[0].title);
	console.log('#angButton (from native)', document.querySelector('#angButton'));
	console.log('#angButton (from angular)', angular.element(document.querySelector('#angButton'))[0] );
	$scope.getAlert = function(text){
		$window.alert(text);
	};
	$document.find("button").on("click", function(event) {
		if (angular.element(event.target.parentElement).hasClass('dom-service')) {
			$window.alert(event.target.innerText);
		}
	});
}]);

myApp.controller('sanitizeController', ['$scope', '$sanitize', '$sce', function($scope, $sanitize, $sce) {
	$scope.htmlcode='<div style="background: red;">Жми <a href="javascript:;" onclick="alert(0);">тут</a></div>';

	//в этих описаниях остаются вопросы!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!????????????????????????????????????
	//$sce: удаляет потенциально опасные элементы и атрибуты из кода html
	//$sanitize: заменяет потенциально опасные символы эскейп-последовательностями

	//Чтобы динамически отслеживать все изменения модели, применяется сервис $scope.$watch,
	//который в качестве первого параметра принимает название модели, а в качестве второго - функцию, в которую передается новое значение.
	$scope.$watch("htmlcode", function (newValue) {
		$scope.htmlcode = newValue;
		$scope.htmlcodeSanitize = $sanitize(newValue);
		//Метод $sce.trustAsHtml() рассматривает кусок текста как html. Хотя он и кодирует теги,
		//	но если мы введем код с javascript, то js-код будет действовать
		$scope.htmlcodeSce = $sce.trustAsHtml(newValue);
	});
}]);

myApp.controller('httpController', ['$scope', '$http', function($scope, $http) {
	$scope.loaded = false;

	$scope.load = function (){
		//Сервис $http представляет ключевой сервис Angular, предназначенный для взаимодействия
		// с удаленным HTTP-сервером через объект XMLHttpRequest или через JSONP.
		$http.get('json/question.json').success(function(data) {
			$scope.question = data.question;
			$scope.loaded = true;
		});
	};
	$scope.voteUp = function (answer){
		answer.rate++;
	};
	$scope.voteDown = function (answer){
		answer.rate--;
	};
}]);