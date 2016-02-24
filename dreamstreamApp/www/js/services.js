'use strict';

angular.module('dreamstreamApp.services', [])
  .factory('DreamWordsFactory', function() {
    var wordArray = [
      "Hello",
      "world",
      "normally",
      "you",
      "want",
      "more",
      "words",
      "than",
      "this",
      "make",
      "a",
      "super",
      "long",
      "want",
      "more",
      "words",
      "than",
      "this",
      "make",
      "a",
      "super",
      "long",
      "long",
      "long",
      "long",
      "long"
    ];
    return {
      get: function(){
        // return wordArray;
        var fill = d3.scale.category20();
        d3.layout.cloud().size([300, 300]).words(wordArray.map(function(d) {
          return {
            text: d,
            size: 10 + Math.random() * 90
          };
        })).rotate(function() {
          return ~~(Math.random() * 2) * 90;
        }).font("Impact").fontSize(function(d) {
          return d.size;
        }).on("end", draw).start();

        function draw(words) {
          d3.select("#word-cloud").append("svg").attr("width", 300).attr("height", 300).append("g").attr("transform", "translate(150,150)").selectAll("text").data(words).enter().append("text").style("font-size", function(d) {
            return d.size + "px";
          }).style("font-family", "Impact").style("fill", function(d, i) {
            return fill(i);
          }).attr("text-anchor", "middle").attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          }).text(function(d) {
            return d.text;
          });
        }
      }
    };
  })


.service('signinService', ['$http', signinService])

.service('newDreamService', ['$http', newDreamService]);

function signinService($http){
  return {
    signin: function(user){
      return $http.post('http://localhost:3000/signin', user)
        .then(function(response){
          // console.log('success response');
          return response;
        }, function(error){
          // console.log('service errors');
          return error;
        });
    }
  };
}















function newDreamService($http){
  return {
    addNewDream: function(dream){
      return $http.post('http://localhost:3000/dreams', dream)
      .then(function(response){
        return response;
      }, function(error){
        return error;
      });
    }
  };
}
