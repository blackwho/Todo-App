var app = angular.module('TodoApp')
app.directive('authForm', function(){

	return{
		restrict: 'E',
		replace: true,
		scope:{
			data:'=data',
			authDataCheck: '&'
		},
		templateUrl: '/templates/authForm.html',
		link: function(scope, elem, attrs) {
			console.log(elem);
		}
	}
});