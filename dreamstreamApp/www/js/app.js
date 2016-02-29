// Ionic Starter App
'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('dreamstreamApp', ['ionic', 'dreamstreamApp.controllers', 'dreamstreamApp.services', 'ngMessages'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.home', {
      url: '/home',
      views: {
        'home': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.stream', {
      cache: false,
      url: '/stream',
      views: {
        'stream': {
          templateUrl: 'templates/stream.html',
          controller: 'StreamCtrl as SC'
        }
      }
    })
    .state('tab.new', {
      cache: false,
      url: '/new',
      views: {
        'new': {
          templateUrl: 'templates/new.html',
          controller: 'NewCtrl as New'
        }
      }
    })
    .state('tab.data', {
      cache: false,
      url: '/data',
      views: {
        'data': {
          templateUrl: 'templates/data.html',
          controller: 'DataCtrl as Data'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'account': {
          templateUrl: 'templates/account.html',
          controller: 'AccountCtrl as Account'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');
  $httpProvider.interceptors.push("AuthInterceptor");

});
