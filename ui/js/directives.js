//-----------------------------------------------------------------------------------------------
//Директивы должны осуществлять манипуляции с DOM или содержать DOM селекторы.
//-----------------------------------------------------------------------------------------------

//В качестве названия директивы используется "answerList". Согласно соглашениям об именовании любая буква
// в верхнем регистре расциенивается как начало нового слова, которое будет отделено от предыдущего дефисом.
//То есть для AngularJS "answerList" будет представлять "answer-list" или "answer-List"

myApp.directive("answerList", function () {
	//В функцию создания директивы передается три параметра именно в такой последовательности:
	//scope - объект $scope, установленный в контроллере
	//element - элемент, к которому применяется директива
	//attrs - объект атрибутов в виде {название_атрибута: его_значение, ...}

	return function (scope, element, attrs) {
		//В данном случае элементом является элемент div, а объект атрибутов будет
		//содержать единcтвенный атрибут - answer-list, где 'question' - это его значение и, соответственно, объект $scope.question

		//var data = scope[attrs["answerList"]]; // - возможна и такая запись
		var data = scope[attrs.answerList]; // получить объект question можно и напрямую -> var data = scope.question;

		//Далее мы можем уже обращаться к объектам, которые заключены внутри $scope.question: data.answers.
		//Но перед обращением мы проверяем, является ли нужный нам объкт массивом: angular.isArray(data.answers)
		//Дальше в директиве идет создание html-элементов и перебор элементов внутри массива data.answers.
		//Для создания элементов применяется функция angular.element(),
		//а для добавления созданных элементов в другой - метод append()
		if (angular.isArray(data.answers)) {
			var ulElem = angular.element("<ul>");
			element.append(ulElem);
			for (var i = 0; i < data.answers.length; i++) {
				var liElem = angular.element('<li>');
				liElem.append(angular.element('<p>').text(data.answers[i].text));
				ulElem.append(liElem);
			}
		}
	}
});

myApp.directive("answerListParam", function () {
	return {
		//свойство restrict позволяет указать объект, к которому директива будет применяться:
		//E: директива применяется к элементу:
		// <answer-list-param source="question" />
		//A: директива применяется к атрибуту - в предыдущей директиве answerList как раз применялся такой подход, но без использования свойства restrict:
		// <div answer-list-param="question"></div>
		//C: директива применяется к классу: (не рекомендуется использовать)
		// <div class="answer-list-param"></div>
		//M: директива применяется к комментарию: (не рекомендуется использовать)
		// <!-- directive: answer-list-param -->
		restrict: "EACM",

		//Свойство link позволяет задать функцию директивы
		link: function (scope, element, attrs) {

			//var data = scope[attrs["answerList"] || attrs["source"]]; // если предусматривать возможность получения из двух атрибутов
			var data = scope[attrs["source"]];

			if (angular.isArray(data.answers)) {
				var divElem = angular.element("<div>").addClass("answers");

				if (element[0].nodeName == "#comment") {
					element.parent().append(divElem);
				} else {
					element.append(divElem);
				}

				for (var i = 0; i < data.answers.length; i++) {
					var answerElem = angular.element('<div>').addClass("answer");

					answerElem.append(angular.element('<b>').text(data.answers[i].text));
					answerElem.append(angular.element('<p>').text(data.answers[i].author));

					var iElem =angular.element('<i>').text(data.answers[i].date);
					var dateElem = angular.element('<p>').append(iElem);

					answerElem.append(dateElem);
					divElem.append(answerElem);
				}
			}
		}
	}
});

myApp.directive("answerListTemplate", function () {
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			scope.data = scope[attrs["answerListTemplate"]];
		},
		template: "<div class='answers'>" +
		"<div ng-repeat='answer in data.answers' class='answer'>" +
		"<div class='vote'>" +
		"<a class='vote-up' ng-click='voteUp(answer)'></a>" +
		"<span class='rate'>{{answer.rate}}</span>" +
		"<a class='vote-down' ng-click='voteDown(answer)'></a>" +
		"</div>" +
		"<b>{{answer.text | formatText}}</b>" +
		"<p>{{answer.author}}</p>" +
		"<p><i>{{answer.date}}</i></p>" +
		"</div></div>"
	}
});

myApp.directive("answerListUrlTemplate", function () {
	return {
		restrict: "A",
		templateUrl: "templates/answerListUrlTemplate.html"
	}
});

myApp.directive("answerListTransclude", function () {
	return {
		restrict: "A",
		templateUrl: "templates/answerListUrlTransclude.html",
		transclude: true
	}
});

myApp.directive("answerListCompile", function($compile) {
	//сервис $compile преобразует HTML-код, содержащий выражения привязки и директивы,
	//в функцию, вызываемую для генерации контента.
	//Сервис $compile представляет функцию, генерирующую контент из фрагментов html.
	//Чтобы наполнить контент данными из контроллера, в функцию передается параметр scope: compileFn(scope);
	//Завершает работу метод element.append(answersElem), который добавляет сгенерированный контент в структру DOM веб-страницы.

	//В каких случаях удобно использовать в директиве сервис $compile:
	//	когда надо преобразовать имеющийся HTML-код в шаблон и объединить этот шаблон с объектом scope для последующего использования

	return function (scope, element, attrs) {
		var content = "<div class='answers'>" +
			"<div ng-repeat='answer in question.answers' class='answer'>" +
			"<div class='vote'>" +
			"<a class='vote-up' ng-click='voteUp(answer)'></a>" +
			"<span class='rate'>{{answer.rate}}</span>" +
			"<a class='vote-down' ng-click='voteDown(answer)'></a>" +
			"</div>" +
			"<b>{{answer.text | formatText}}</b>" +
			"<p>{{answer.author}}</p>" +
			"<p><i>{{answer.date}}</i></p>" +
			"</div></div>";
		var answersElem = angular.element(content);
		var compileFn = $compile(answersElem);

		compileFn(scope);
		element.append(answersElem);
	}
});