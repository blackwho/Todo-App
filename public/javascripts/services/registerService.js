var app = angular.module("TodoApp.RegisterService", []);
app.factory('registerUser', ['$http', function($http){
	var regService = {};
	regService.sendCredentials = function(creds){
		console.log("Creds: "+ creds.email);
		return $http.post("/register", creds);
	}
	return regService;
}])