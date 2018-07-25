var wlirAppCache         = "?0";
var wlirApp              = angular.module("wlirApp",["ngRoute"]);

wlirApp.config(function($routeProvider,$locationProvider,$scope) {
    $routeProvider
      .when("/", {
          templateUrl : "views/home.html" + wlirAppCache,
          pageState : "home"
      }); 
    $locationProvider.hashPrefix("");
});

wlirApp.controller("wlirInit", ["$scope","$rootScope","$http","$location","$route", 
  function($scope,$rootScope,$http,$location,$route) {

    $scope.login = "Please Login";

    $http({
      method: "GET",
      url: "//localhost:8080/api/"
    }).then(
      function successCallback(response) {
        $scope.api_connect = "We're connected!";
        console.log("full response...");
        console.log(response);
      }, 
      function errorCallback(response) {
        $scope.api_connect = "We couldn't connect!";
        console.log("request url: " + response.config.url);
        console.log("status code: " + response.status);
        console.log("full response...");
        console.log(response);
      }
    );
}]);