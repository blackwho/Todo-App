var controllerModule = angular.module("TodoApp.BoardingController",[]);

controllerModule.controller('OnboardingController', ['$scope', '$stateParams', '$window', 'onboardingServices', function($scope,$stateParams, $window, onboardingServices){
	$scope.title = "Onboarding Page";
	$scope.name = '';
	$scope.email = '';
	$scope.file = '';
	$scope.profilePic = "/images/avatar.jpg";
	$scope.toggler = true;

	$scope.adminInfo = function(){

	var adminInfoData = {
		name : $scope.name,
		email : $scope.email,
		file : $scope.file ? $scope.file : $scope.profilePic
	};

	onboardingServices.uploadData(adminInfoData).then(function(){
		$scope.toggler = false;
	});


	};

	$scope.fetch = function(){
		onboardingServices.fetchData().then(function(response){
			console.log(response.data);
			if(response.data.s == 'p'){
				$scope.name = response.data.d.name;
				$scope.email = response.data.d.email;
				if ("avatar" in response.data.d) {
					if ("secure_url" in response.data.d.avatar) {
						$scope.profilePic = response.data.d.avatar.secure_url;
					}
				}
				
			}else{
				alert("Please fill data");
			}
		});
	}

	$scope.logout = function(){
		onboardingServices.logout().then(function(response){
		if (response.data.s == 'p') {
			$window.location = '/login';
		}else{
			alert("Error Occured");
		}
	});
	}
	
}]);