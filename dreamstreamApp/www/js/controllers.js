'use strict';
angular.module('dreamstreamApp.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('StreamCtrl', function($scope) {})

.controller('NewCtrl', function($scope) {})

.controller('AccountCtrl', function($scope, $location, signinService, signupService) {
  var vm = this;
  vm.signin = signin;
  vm.signup = signup;
  function signin(user){
    signinService.signin(user).then(function(response){
      // console.log(response);
      localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
      $location.path('/tab/new');
    });
  }
  function signup(user){
    signupService.signup(user).then(function(response){
      console.log(response);
    });
  }
})

.controller('DataCtrl', function($scope, DreamWordsFactory) {
  $scope.words = DreamWordsFactory.get();
});
