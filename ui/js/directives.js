//В качестве названия директивы используется "answerList". Согласно соглашениям об именовании любая буква
// в верхнем регистре расциенивается как начало нового слова, которое будет отделено от предыдущего дефисом.
//То есть для AngularJS "answerList" будет представлять "answer-list" или "answer-List"

myApp.directive("answerList", function () {
	//В функцию создания директивы передается три параметра:
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