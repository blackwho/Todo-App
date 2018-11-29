var app = angular.module('TodoApp');
app.factory('taskService', ['$http', function($http){
	var taskService = {};
	taskService.editProfile = function(){
		return $http.get("/onboarding");
	}
	taskService.getTasks = function(){
		return $http.get("/getTask");
	}
	taskService.addTasks = function(postData){
		console.log("Task: ");
		if(postData.taskName){
			return $http.post("/addTask", postData);
		}
		
	}
	taskService.deleteTasks = function(postData){
		return $http.post("/deleteTask", postData);
	}
	return taskService;
}])