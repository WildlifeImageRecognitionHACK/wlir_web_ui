var wlirAppCache        = "?1"; // increment this value if views are being cached
var wlirApp             = angular.module("wlirApp",["ngRoute"]);
var wlirAPI             = "/images/";

wlirApp.config(function($routeProvider,$locationProvider,$scope) {
    // This sets up the two views in the single page app for login (/) and image viewer (/review/)
    $routeProvider
      .when("/", {
          templateUrl : "views/home.html" + wlirAppCache,
          pageState : "home"
      })
      .when("/review/", {
          templateUrl : "views/review.html" + wlirAppCache,
          pageState : "home"
      }); 
    // This would add text to the required /#/ portion of the single page app URL. We use an empty string to not add this text.
    $locationProvider.hashPrefix("");
});

wlirApp.controller("wlirInit", ["$scope","$rootScope","$http","$location","$route", 
  function($scope,$rootScope,$http,$location,$route) {

    // this sets the display image to null, the current class (human, animal, neither) to none selected, and the show image state to false. 
    // the "loading" graphic is on a layer under the image, so any time show_image is false, the user will see the loading graphic.

    $scope.current_image = "";
    $scope.current_class = "";
    $scope.show_image = false;

    // This function will submit a request to the API to get an image for the user to 
    $scope.getNewImage = function () {
      // TODO: send OAUTH user token with the image request
      $http({
        method: "GET",
        url: wlirAPI
      }).then(
        function successCallback(response) {
          // TODO: remove console.log for production
          console.log("full response...");
          console.log(response);

          // TODO: set current_image to response URL. (string)
          // $scope.current_image = imageURL;
          // TODO: set current_class to response classification. (string) {'0','1','2'} 
          // $scope.current_class = imageClassification;
          // TODO: set show_image to true
          // $scope.show_image = true;
        }, 
        function errorCallback(response) {
          // TODO: update to useful failure feedback
          console.log("request url: " + response.config.url);
          console.log("status code: " + response.status);
          console.log("full response...");
          console.log(response);
        }
      );
    };

    $scope.onGoogleSignIn = function () {
      alert("hello world");
      // TODO: attempt login
    };

    $scope.onConfirmClick = function () {
      // Sets the loading state.
      $scope.show_image = false;
      $scope.current_class = "";

      // TODO: send image ID and OAUTH user token in request
      $http({
        method: "POST",
        url: wlirAPI
      }).then(
        function successCallback(response) {
          //TODO: $scope.getNewImage();
        }, 
        function errorCallback(response) {
          // TODO: update to useful failure feedback
          console.log("request url: " + response.config.url);
          console.log("status code: " + response.status);
          console.log("full response...");
          console.log(response);
        }
      );
    }

    // TODO: 
    // if (login == true) {
    // $location.path("/#/review/");
    $scope.getNewImage();
    // } else {
    // $location.path("/");
    // }

}]);