var controllerModule = angular.module("TodoApp.TaskController",[]);

controllerModule.controller('TaskListController', ['$scope', '$window', 'taskService', 'onboardingServices', function($scope, $window, taskService, onboardingServices){

	$scope.tasks = [];
	$scope.editProfile = function(){
		$window.location = '/onboarding';
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
	$scope.addTask = function(){
		var data = {
			taskName: $scope.task
		};
		taskService.addTasks(data).then(function(response){
			if(response.data.s == 'p'){
				$scope.getTasks();
			}
		});
		
	}
	$scope.getTasks = function(){
		taskService.getTasks().then(function(response){
			if(response.data.s == 'p'){
				console.log("Data: " + response.data.tasks);
				$scope.tasks = response.data.tasks;
			}
		})
	}
	$scope.deleteTask = function(index){
		console.log(index);
		console.log("Item: " + JSON.stringify($scope.tasks[index].name));
		var data = {
			taskName: $scope.tasks[index].name
		}
		taskService.deleteTasks(data).then(function(response){
			if(response.data.s == 'p'){
				$scope.getTasks();
			}
		})
	}

}])