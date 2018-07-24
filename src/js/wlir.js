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

}]);