var wlirAppCache         = "?0";
var wlirApp              = angular.module("wlirApp",["ngRoute"]);
var wlirApiURL           = "//localhost/";

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
    var api_root = ("//" + config.api.url + ":" + config.api.port + "/");


    $http({
      method: "GET",
      url: api_root
    }).then(function successCallback(response) {
      $scope.api_connect = "We're connected!";
    }, function errorCallback(response) {
      $scope.api_connect = "We couldn't connect!";
      console.log("API Error!");
    });

}]);