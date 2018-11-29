var todoApp = angular.module("TodoApp", ["TodoApp.AuthController", "TodoApp.BoardingController", "TodoApp.TaskController" ,"TodoApp.LoginService", "TodoApp.OnboardingService", "TodoApp.RegisterService", "ui.router","ngFileUpload"]);

todoApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

	//$urlRouterProvider.otherwise("/");

	$stateProvider.state("home", {
		url: "/",
		templateUrl:"/templates/login.html",
		controller: "LoginController",
		controllerAs: "loginCtrl"
	}).state("login", {
		url: "/login",
		templateUrl:"/templates/login.html",
		controller: "LoginController",
		controllerAs: "loginCtrl"
	}).state("register", {
		url: "/register",
		templateUrl:"/templates/register.html",
		controller: "RegisterController",
		controllerAs: "regCtrl"
	}).state("onboarding", {
		url: "/onboarding",
		templateUrl:"/templates/onboarding.html",
		controller: "OnboardingController",
		controllerAs: "onbCtrl"
	}).state("tasks", {
		url: "/tasks",
		templateUrl: "/templates/tasksAdd.html",
		controller: "TaskListController",
		controllerAs: "taskCtrl"
	})



	$locationProvider.html5Mode(true);	
}]);