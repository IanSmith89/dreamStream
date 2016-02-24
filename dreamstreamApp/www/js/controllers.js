'use strict';
angular.module('dreamstreamApp.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('StreamCtrl', function($scope) {})

.controller('NewCtrl', function($scope, $location, newDreamService) {
  var vm = this;
  vm.addNewDream = addNewDream;
  function addNewDream(dream){
    newDreamService.addNewDream(dream)
    .then(function(response){
      $location.path('/tab/stream');
    });
  }
})

.controller('AccountCtrl', function($scope, $location, signinService) {
  var vm = this;
  vm.signin = signin;
  function signin(user){
    signinService.signin(user).then(function(response){
      // console.log(response);
      localStorage.setItem('Authorization', 'Bearer ' + response.data.token);
      $location.path('/tab/new');
    });
  }
})

.controller('DataCtrl', function($scope, DreamWordsFactory) {
  $scope.words = DreamWordsFactory.get();
});
