var app = angular.module("TodoApp.OnboardingService", []);
app.factory('onboardingServices', ['$http', 'Upload', function($http, Upload){
	var services = {};
	services.logout = function(){
		return $http.get("/logout");
	}

	services.uploadData = function(data){
		return $http.post("/onboarding" , data).then(function(response){

		if(response.data.s == 'p'){
			console.log("here look" + JSON.stringify(data.file))
			if (data.file) {
				Upload.upload({
	            url: '/onboarding/upload',
	            data: {file: data.file}
	        }).then(function (resp) {
	        	alert("Profile uploaded");
	            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        });
			}
		}else if (data.file.name || data.file.email) {
			alert("Profile uploaded");
		}else{
			alert("ERROR");
		}

	});
	}

	services.fetchData = function(){

		return $http.get("/onboarding/fetch")
	}
	return services;
}])