angular.module('dreamstreamApp.services', [])

.service('Dreams', ['$http', function($http) {
  // var dreams = [];
  // $http
  //   .get('http://localhost:3000/api/books')
  //   .then(function(obj) {
  //     var dataArr = obj.data;
  //     return dataArr;
  //   }, function(response) {
  //     console.error(new Error(response));
  //   });
  // return {
  //   all: function() {
  //     return dreams;
  //   },
  //   remove: function(dream) {
  //     dreams.splice(dreams.indexOf(dream), 1);
  //   },
  //   get: function(dreamId) {
  //     for (var i = 0; i < dreams.length; i++) {
  //       if (dreams[i].id === parseInt(dreamId)) {
  //         return dreams[i];
  //       }
  //     }
  //     return null;
  //   }
  // };
}]);
