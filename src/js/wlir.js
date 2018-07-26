var wlirAppCache        = "?0";
var wlirApp             = angular.module("wlirApp",["ngRoute"]);
var wlirAPI             = "//localhost:8080/api/";
var wlirImage           = "./img/bunny.png";

wlirApp.config(function($routeProvider,$locationProvider,$scope) {
    $routeProvider
      .when("/", {
          templateUrl : "views/home.html" + wlirAppCache,
          pageState : "home"
      })
      .when("/review/", {
          templateUrl : "views/review.html" + wlirAppCache,
          pageState : "home"
      }); 
    $locationProvider.hashPrefix("");
});

wlirApp.controller("wlirInit", ["$scope","$rootScope","$http","$location","$route", 
  function($scope,$rootScope,$http,$location,$route) {

    $scope.login = "Please Login";
    $scope.displayed_image = wlirImage;
    $scope.show_image = false;

    $http({
      method: "GET",
      url: wlirAPI
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
    $scope.onGoogleSignIn = function () {
      alert("hello world");
    }
}]);