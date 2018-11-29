var controllerModule = angular.module("TodoApp.AuthController",[]);

controllerModule.controller('LoginController', ['$scope', '$stateParams', '$window', 'loginUser', function($scope,$stateParams, $window, loginUser){
	$scope.title = "Login";
	$scope.email = "";
	$scope.pass = "";
	$scope.login = function(email, password){
		$scope.email = email;
		$scope.pass = password;
		console.log("Email: " + $scope.email);
		console.log("Password: " + $scope.pass);
		var loginData = {
			email: $scope.email,
			pass: $scope.pass
		}
		loginUser.sendCredentials(loginData).then(function(response){
			console.log(response.data);
			if(response.data.s == 'p'){
				alert("Authenticated");
				if(response.data.data){
					$window.location = '/tasks'
				}else{
					$window.location = '/onboarding';
				}
			}else if (response.data.s == 'f') {
				console.log(response.data);
				$window.location = '/login';
			}
		});
	}
}]);

controllerModule.controller('RegisterController', ['$scope', '$stateParams', '$window', 'registerUser',function($scope, $stateParams, $window, registerUser){
	$scope.title = "Register";
	$scope.email = "";
	$scope.pass = "";
	$scope.register = function(email, password){
		$scope.email = email;
		$scope.pass = password;
		console.log("Email: " + $scope.email);
		console.log("Password: " + $scope.pass);
		var registerData = {
		email: $scope.email,
		pass: $scope.pass
		}
		console.log("Creds: "+ registerData);
		registerUser.sendCredentials(registerData).then(function(response){
			//console.log(data);
			if(response.data.s == 'p'){
				alert("All done");
				$window.location = '/';
			}else{
				if(response.data.d == 'user_exist')
					alert("ERROR: User Exist.Try to use another account or Login.");
			}
		});
	}
}]);