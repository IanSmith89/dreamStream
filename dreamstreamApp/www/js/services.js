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

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('signinService', ['$http', signinService])
.service('signupService', ['$http', signupService]);

function signinService($http){
  return {
    signin: function(user){
      return $http.post('http://localhost:3000/signin', user)
        .then(function(response){
          // console.log('success response');
          return response;
        }, function(response){
          // console.log('service errors');
          console.log(response);
        });
    }
  };
}

function signupService($http){
  return {
    signup: function(user){
      return $http.post('http://localhost:3000/signup', user)
        .then(function(response){
          // console.log('success response');
          return response;
        }, function(response){
          // console.log('service errors');
          console.log(response);
        });
    }
  };
}
