'use strict';
angular.module('dreamstreamApp.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('StreamCtrl', function($scope, Dreams) {
  var vm = this;
  vm.loadDreams = Dreams.all()
    .then(function(dreamsArr) {
      console.log(dreamsArr);
      vm.dreams = dreamsArr.data;
    })
    .catch(function(err) {
      console.err(new Error(err));
    });
})

.controller('NewCtrl', function($scope, $state, newDreamService) {
  var vm = this;
  vm.addNewDream = addNewDream;
  function addNewDream(dream){
    newDreamService.addNewDream(dream)
    .then(function(response){
      $state.go('tab.stream', {}, {
        reload: true
      });
      // $location.path('/tab/stream');
    });
  }
})

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
