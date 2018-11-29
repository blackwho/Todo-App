var app = angular.module('TodoApp');
app.directive('taskList', function(){

	return{
		
		restrict: 'E',
		replace: true,
		scope:{
			data: '=data',
			deleteClickedTask: '&'
		},
		templateUrl: '/templates/tasksList.html',
		link: function(scope, elem, attrs) {
			console.log(elem);
		}
	}
});