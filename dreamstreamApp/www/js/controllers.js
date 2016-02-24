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

.controller('NewCtrl', function($scope) {})

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
