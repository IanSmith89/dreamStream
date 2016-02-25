'use strict';

angular.module('dreamstreamApp.services', [])
  // .service('DreamParser', function(dreamStr) {
  //   dreamStr = dreamStr.replace(/[,.:;"'|!@#$%^&*()_+=<>-]/g, '');
  //   var dreamArr = dreamStr.split(' ');
  //   for (var i = 0; i < dreamArr.length; i++) {
  //     dreamArr[i] = dreamArr[i].toLowerCase();
  //   }
  //   return dreamArr;
  // })
  .service('DreamParser', [dreamParserFunc])
  .service('DreamWordsService', [dreamCloudService])

.service('signinService', ['$http', signinService])

.service('newDreamService', ['$http', newDreamService])

.service('Dreams', ['$http', function($http) {

    this.all = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/dreams'
      }).then(function(obj) {
        return obj;
      }, function(response) {
        console.error(new Error(response));
      });
    };
    this.remove = function(dream) {
      dreams.splice(dreams.indexOf(dream), 1);
    };
    this.get = function(dreamId) {
      for (var i = 0; i < dreams.length; i++) {
        if (dreams[i].id === parseInt(dreamId)) {
          return dreams[i];
        }
      }
      return null;
    };
  }])
  .service('Filters', ['$http', function($http) {

    this.all = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/filters/all'
      }).then(function(obj) {
        return obj;
      }, function(response) {
        console.error(new Error(response));
      });
    };
  }])

.service("AuthInterceptor", function($location, $q) {
  return {
    request: function(config) {
      // prevent browser bar tampering for /api routes
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      var token = localStorage.getItem("Authorization");
      if (token)
        config.headers.Authorization = token;
      return $q.resolve(config);
    },
    responseError: function(err) {
      // if you mess around with the token, log them out and destroy it
      if (err.data === "invalid token" || err.data === "invalid signature" || err.data === "jwt malformed") {
        $location.path("/signin");
        return $q.reject(err);
      }
      // if you try to access a user who is not yourself
      if (err.status === 401) {
        $location.path('/signin');
        return $q.reject(err);
      }
      return $q.reject(err);
    }
  };
})

.service('signinService', ['$http', signinService])
  .service('signupService', ['$http', signupService]);

function signinService($http) {
  return {
    signin: function(user) {
      return $http.post('http://localhost:3000/signin', user)
        .then(function(response) {
          // console.log('success response');
          return response;
        }, function(error) {
          // console.log('service errors');
          return error;
        });
    }
  };
}

function signupService($http) {
  return {
    signup: function(user) {
      return $http.post('http://localhost:3000/signup', user)
        .then(function(response) {
          // console.log('success response');
          return response;
        }, function(response) {
          // console.log('service errors');
          console.log(response);
        });
    }
  };
}

function newDreamService($http) {
  return {
    addNewDream: function(dream) {
      return $http.post('http://localhost:3000/dreams', dream)
        .then(function(response) {
          return response;
        }, function(error) {
          return error;
        });
    }
  };
}

function dreamParserFunc() {
  return {
    parse: function(dreamStr) {
      dreamStr = dreamStr.replace(/[,.:;"'|!@#$%^&*()_+=<>-]/g, '');
      var dreamArr = dreamStr.split(' ');
      for (var i = 0; i < dreamArr.length; i++) {
        dreamArr[i] = dreamArr[i].toLowerCase();
      }
      return dreamArr;
    }
  };
}

function dreamCloudService() {
  return {
    draw: function(arr) {
      // console.log(arr);
      function wordObj(arr) {
        var obj = {};
        arr.forEach(function(el) {
          obj[el] = 1;
        });
        arr.sort();
        for (var i = 1; i < arr.length; i++) {
          if (arr[i - 1] === arr[i]) {
            obj[arr[i]]++;
          }
        }
        return obj;
      }

      var newObj = wordObj(arr);

      //Remove duplicates from array
      var uniqueArray = arr.filter(function(item, pos, self) {
        return self.indexOf(item) === pos;
      });
      var fill = d3.scale.category20();
      //Create word cloud
      d3.layout.cloud().size([400, 400])
        .words(uniqueArray.map(function(d) {
          var maxCount = 0;
          for (var item in newObj) {
            if (newObj[item] > maxCount) {
              maxCount = newObj[item];
            }
          }

          return {
            text: d,
            size: (105 * (newObj[d] / maxCount)) + 5
          };
        }))
        .rotate(function() {
          return ~~(Math.random() * 2) * 90;
        })
        .font("Impact").fontSize(function(d) {
          // console.log(d)
          return d.size;
        })
        .on("end", draw).start();

      function draw(words) {
        d3.select("#word-cloud").append("svg").attr("width", 500).attr("height", 500).append("g").attr("transform", "translate(200,200)").selectAll("text").data(words).enter().append("text").style("font-size", function(d) {
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
  }



}
