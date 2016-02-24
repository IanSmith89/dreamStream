'use strict';
angular.module('dreamstreamApp.controllers', ['dreamstreamApp.services'])

.controller('HomeCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('MicCtrl', function($scope, $cordovaCapture) {
  var vm = this;
  vm.record = $cordovaCapture.captureAudio().then(function(err, data) {
    if (err) {
      console.log(err);
    }
    vm.test_output.innerText = 'Testing Testing';
    console.log(data);
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('NewCtrl', function($scope) {
});
