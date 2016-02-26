'use strict';

angular.module('dreamstreamApp.services', [])
.service('dbURL', [dbURL])

.service('DreamParser', [dreamParserFunc])

.service('DreamWordsService', [dreamCloudService])

.service('newDreamService', ['$http', newDreamService])

.service('scatterService', [scatterService])

.service('Dreams', ['$http', 'dbURL', function($http, dbURL) {
    this.all = function() {
      return $http({
        method: 'GET',
        url: dbURL.url + '/dreams'
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

.service('Filters', ['$http', 'dbURL', function($http, dbURL) {

    this.all = function() {
      return $http({
        method: 'GET',
        url: dbURL.url + '/filters/all'
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

.service('signinService', ['$http', 'dbURL', signinService])

.service('signupService', ['$http', 'dbURL', signupService]);

// .service('pieChartService', [pieChartService]);


function dbURL(){
  return {
    url: "https://serene-atoll-41100.herokuapp.com"
  };
}

function signinService($http, dbURL) {
  return {
    signin: function(user) {
      return $http.post(dbURL.url + '/signin', user)
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

function signupService($http, dbURL) {
  return {
    signup: function(user) {
      return $http.post(dbURL.url + '/signup', user)
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

function newDreamService($http, dbURL) {
  return {
    addNewDream: function(dream) {
      return $http.post(dbURL.url + '/dreams', dream)
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
      dreamStr = dreamStr.replace(/[,.:;"'|!@#$%^&*()\?_+=<>-]/g, '');
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
      d3.layout.cloud().size([350, 350])
        .words(uniqueArray.map(function(d) {
          var maxCount = 0;
          for (var item in newObj) {
            if (newObj[item] > maxCount) {
              maxCount = newObj[item];
            }
          }

          return {
            text: d,
            size: (95 * (newObj[d] / maxCount)) + 5
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
        d3.select("#word-cloud").append("svg").attr("width", 350).attr("height", 350).append("g").attr("transform", "translate(175,175)").selectAll("text").data(words).enter().append("text").style("font-size", function(d) {
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

function scatterService(){
  return {
    show: function(data){
      // just to have some space around items.
       var margins = {
           "left": 40,
           "right": 30,
           "top": 30,
           "bottom": 30
       };

       var width = 500;
       var height = 500;

       // this will be our colour scale. An Ordinal scale.
       var colors = d3.scale.category10();

       // we add the SVG component to the scatter-load div
       var svg = d3.select("#scatter-load").append("svg").attr("width", width).attr("height", height).append("g")
           .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

       // this sets the scale that we're using for the X axis.
       // the domain define the min and max variables to show. In this case, it's the min and max prices of items.
       // this is made a compact piece of code due to d3.extent which gives back the max and min of the price variable within the dataset
       var x = d3.scale.linear()
           .domain(d3.extent(data, function (d) {
           return d.mood;
       }))
       // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
           .range([0, width - margins.left - margins.right]);

       // this does the same as for the y axis but maps from the rating variable to the height to 0.
       var y = d3.scale.linear()
           .domain(d3.extent(data, function (d) {
           return d.rating;
       }))
       // Note that height goes first due to the weird SVG coordinate system
       .range([height - margins.top - margins.bottom, 0]);

       // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
       svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
       svg.append("g").attr("class", "y axis").attr("transform", "translate(0," + x.range()[0] + ")");

       // this is our X axis label. Nothing too special to see here.
       svg.append("text")
           .attr("fill", "#414241")
           .attr("text-anchor", "end")
           .attr("x", 425)
           .attr("y", height - 70)
           .text("Mood");


       svg.append("text")
           .attr("fill", "#414241")
           .attr("transform", "rotate(-90)")
           .attr("text-anchor", "end")
           .attr("dy", ".71em")
           .attr("y",6)
           .text("Rating");


       // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
       var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
       var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

       // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
       svg.selectAll("g.y.axis").call(yAxis);
       svg.selectAll("g.x.axis").call(xAxis);

       // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
       var dream = svg.selectAll("g.node").data(data, function (d) {
           return d.id;
       });

       // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.

       var dreamGroup = dream.enter().append("g").attr("class", "node")
       // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
       .attr('transform', function (d) {
           return "translate(" + x(d.mood) + "," + y(d.rating) + ")";
       });

       // we add our first graphics element! A circle!
      //  var formatTime = d3.dateTime.format("%e %B");

       var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

       dreamGroup.append("circle")
           .attr("r", 10)
           .attr("class", "dot")
           .attr("on-touch", "onTouch()")
           .attr("class", "button")
           .style("fill", function (d) {
               // remember the ordinal scales? We use the colors scale to get a colour for our manufacturer. Now each node will be coloured
               // by who makes the chocolate.
               return colors(d.id);
       })
           .on("mouseover", function(d) {
             console.log(d)
              div.transition()
                  .duration(200)
                  .style("opacity", 0.9);
              div.html((d.dateTime) + "<br/>"  + d.close)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
              })
              .on("mouseout", function(d) {
                div.transition()
                   .duration(500)
                   .style("opacity", 0);
                 });

       // now we add some text, so we can see what each item is.
       dreamGroup.append("text")
           .style("text-anchor", "middle")
           .attr("dy", -10)
           .text(function (d) {
               // this shouldn't be a surprising statement.
               var splitDate = d.dateTime.slice(0,10)
              //  console.log(splitDate)
               return splitDate;
          });
        }
      };
    }


// function pieChartService() {
//   var gradPie={};
//
// 	var pie = d3.layout.pie().sort(null).value(function(d) {return d.value;});
//
// 	var createGradients = function(defs, colors, r){
// 		var gradient = defs.selectAll('.gradient')
// 			.data(colors).enter().append("radialGradient")
// 			.attr("id", function(d,i){return "gradient" + i;})
// 			.attr("gradientUnits", "userSpaceOnUse")
// 			.attr("cx", "0").attr("cy", "0").attr("r", r).attr("spreadMethod", "pad");
//
// 		gradient.append("stop").attr("offset", "0%").attr("stop-color", function(d){ return d;});
//
// 		gradient.append("stop").attr("offset", "30%")
// 			.attr("stop-color",function(d){ return d;})
// 			.attr("stop-opacity", 1);
//
// 		gradient.append("stop").attr("offset", "70%")
// 			.attr("stop-color",function(d){ return "black";})
// 			.attr("stop-opacity", 1);
// 	}
//   return {
//     draw: function(id, data, cx, cy, r){
// 		var gPie = d3.select("#"+id).append("g")
// 			.attr("transform", "translate(" + cx + "," + cy + ")");
//
// 		createGradients(gPie.append("defs"), data.map(function(d){ return d.color; }), 2.5*r);
//
// 		gPie.selectAll("path").data(pie(data))
// 			.enter().append("path").attr("fill", function(d,i){ return "url(#gradient"+ i+")";})
// 			.attr("d", d3.svg.arc().outerRadius(r))
// 			.each(function(d) { this._current = d; });
//   	}
//   };
// }
