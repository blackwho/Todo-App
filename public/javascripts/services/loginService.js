var app = angular.module('TodoApp.LoginService',[]);
app.factory('loginUser', ['$http', function($http){
	var logService = {};
	logService.sendCredentials = function(creds){
		console.log("Creds: "+ creds.email);
		return $http.post("/login", creds);
	}
	return logService;
}])