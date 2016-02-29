'use strict';

angular.module('dreamstreamApp.services', [])
  .service('dbURL', [dbURL])

.service('DreamParser', ['dbURL', dreamParserFunc])

.service('DreamAnalysis', ['$http', 'dbURL', dreamAnalysisFunc])

.service('dreamAnalysisChart', ['DreamAnalysis', 'highchartsNG', dreamAnalysisChart])

.service('DreamWordsService', ['dbURL', dreamCloudService])

.service('newDreamService', ['$http', 'dbURL', newDreamService])

.service('scatterService', ['dbURL', scatterService])

// .service('pieChartService', ['dbURL', pieChartService])

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
  .service('CustomFilters', ['$http', 'dbURL', '$state', CustomFilters])

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


function dbURL() {
  return {
    url: "https://serene-atoll-41100.herokuapp.com"
  };
}

//Dream Analysis

function dreamAnalysisFunc($http, dbURL) {
  return {
    analyze: function() {
      return $http.get(dbURL.url + '/analyze')
        .then(function(response) {
          // console.log('success response');
          return response;
        }, function(err) {
          // console.log('service errors');
          console.log(err);
        });
    }
  };
}

function dreamAnalysisChart(DreamAnalysis, highchartsNG)
{
  return function(){
    console.log('Dream Analyzer Load.');
    //var analysisData = DreamAnalysis.analyze();
    var analysisData = [
  {
    "id": "Openness",
    "name": "Openness",
    "category": "personality",
    "percentage": 0.29889988660746364,
    "sampling_error": 0.0646541906,
    "children": [
      {
        "id": "Adventurousness",
        "name": "Adventurousness",
        "category": "personality",
        "percentage": 0.3099662476406275,
        "sampling_error": 0.053974814399999994
      },
      {
        "id": "Artistic interests",
        "name": "Artistic interests",
        "category": "personality",
        "percentage": 0.011499688623314646,
        "sampling_error": 0.10983142039999999
      },
      {
        "id": "Emotionality",
        "name": "Emotionality",
        "category": "personality",
        "percentage": 0.3137801800575866,
        "sampling_error": 0.050517685900000005
      },
      {
        "id": "Imagination",
        "name": "Imagination",
        "category": "personality",
        "percentage": 0.537657504829199,
        "sampling_error": 0.0681367154
      },
      {
        "id": "Intellect",
        "name": "Intellect",
        "category": "personality",
        "percentage": 0.5039773478003599,
        "sampling_error": 0.0598227851
      },
      {
        "id": "Liberalism",
        "name": "Authority-challenging",
        "category": "personality",
        "percentage": 0.19125168323553338,
        "sampling_error": 0.0878672088
      }
    ]
  },
  {
    "id": "Conscientiousness",
    "name": "Conscientiousness",
    "category": "personality",
    "percentage": 0.42910769911127244,
    "sampling_error": 0.0807477607,
    "children": [
      {
        "id": "Achievement striving",
        "name": "Achievement striving",
        "category": "personality",
        "percentage": 1,
        "sampling_error": 0.1039639928
      },
      {
        "id": "Cautiousness",
        "name": "Cautiousness",
        "category": "personality",
        "percentage": 0.6705834156878299,
        "sampling_error": 0.0962437979
      },
      {
        "id": "Dutifulness",
        "name": "Dutifulness",
        "category": "personality",
        "percentage": 0.5372093945624348,
        "sampling_error": 0.064982677
      },
      {
        "id": "Orderliness",
        "name": "Orderliness",
        "category": "personality",
        "percentage": 0.5021499641613739,
        "sampling_error": 0.0739729013
      },
      {
        "id": "Self-discipline",
        "name": "Self-discipline",
        "category": "personality",
        "percentage": 0.060992693368391894,
        "sampling_error": 0.0495376856
      },
      {
        "id": "Self-efficacy",
        "name": "Self-efficacy",
        "category": "personality",
        "percentage": 0.07862453443639145,
        "sampling_error": 0.0971877116
      }
    ]
  },
  {
    "id": "Extraversion",
    "name": "Extraversion",
    "category": "personality",
    "percentage": 0.16674295198051417,
    "sampling_error": 0.0604103701,
    "children": [
      {
        "id": "Activity level",
        "name": "Activity level",
        "category": "personality",
        "percentage": 1,
        "sampling_error": 0.0825107204
      },
      {
        "id": "Assertiveness",
        "name": "Assertiveness",
        "category": "personality",
        "percentage": 0.9163877158975248,
        "sampling_error": 0.08782762670000001
      },
      {
        "id": "Cheerfulness",
        "name": "Cheerfulness",
        "category": "personality",
        "percentage": 0.5915691825969397,
        "sampling_error": 0.11047754030000001
      },
      {
        "id": "Excitement-seeking",
        "name": "Excitement-seeking",
        "category": "personality",
        "percentage": 0.3395071867167182,
        "sampling_error": 0.0843126178
      },
      {
        "id": "Friendliness",
        "name": "Outgoing",
        "category": "personality",
        "percentage": 0.5042122996508643,
        "sampling_error": 0.0793638476
      },
      {
        "id": "Gregariousness",
        "name": "Gregariousness",
        "category": "personality",
        "percentage": 0.5946082120343356,
        "sampling_error": 0.0606254611
      }
    ]
  },
  {
    "id": "Agreeableness",
    "name": "Agreeableness",
    "category": "personality",
    "percentage": 0.6415230040413935,
    "sampling_error": 0.10132855,
    "children": [
      {
        "id": "Altruism",
        "name": "Altruism",
        "category": "personality",
        "percentage": 0.44594272939822116,
        "sampling_error": 0.0748349619
      },
      {
        "id": "Cooperation",
        "name": "Cooperation",
        "category": "personality",
        "percentage": 0.2327733854483525,
        "sampling_error": 0.0835296811
      },
      {
        "id": "Modesty",
        "name": "Modesty",
        "category": "personality",
        "percentage": 0.31130619777202173,
        "sampling_error": 0.0596950491
      },
      {
        "id": "Morality",
        "name": "Uncompromising",
        "category": "personality",
        "percentage": 0.2220234966939557,
        "sampling_error": 0.066485579
      },
      {
        "id": "Sympathy",
        "name": "Sympathy",
        "category": "personality",
        "percentage": 0.1247168649323529,
        "sampling_error": 0.1025469704
      },
      {
        "id": "Trust",
        "name": "Trust",
        "category": "personality",
        "percentage": 0.19470602712638185,
        "sampling_error": 0.0605325694
      }
    ]
  },
  {
    "id": "Neuroticism",
    "name": "Emotional range",
    "category": "personality",
    "percentage": 0.734429564489743,
    "sampling_error": 0.0958079045,
    "children": [
      {
        "id": "Anger",
        "name": "Fiery",
        "category": "personality",
        "percentage": 0.913194799854024,
        "sampling_error": 0.0986774057
      },
      {
        "id": "Anxiety",
        "name": "Prone to worry",
        "category": "personality",
        "percentage": 0.7980462446481974,
        "sampling_error": 0.0584436788
      },
      {
        "id": "Depression",
        "name": "Melancholy",
        "category": "personality",
        "percentage": 0.8207191567911146,
        "sampling_error": 0.0626535466
      },
      {
        "id": "Immoderation",
        "name": "Immoderation",
        "category": "personality",
        "percentage": 0.16020127969907594,
        "sampling_error": 0.056264441
      },
      {
        "id": "Self-consciousness",
        "name": "Self-consciousness",
        "category": "personality",
        "percentage": 1,
        "sampling_error": 0.0605791527
      },
      {
        "id": "Vulnerability",
        "name": "Susceptible to stress",
        "category": "personality",
        "percentage": 0.8905257035232674,
        "sampling_error": 0.0902259525
      }
    ]
  }
];

    var categoryData = [];
    var traitData = [];
    var colors = ['#FFC300', '#00B3C5', '#A0DAEA', '#0B3041', '#3D79A1', 'blue', 'red'];
    // Build the data arrays
    var categoryMax = 0;
    var fullMax = 0;
    var traitMax = [];
    for (var i = 0; i < analysisData.length; i ++) {
      categoryMax += analysisData[i].percentage;
      for(var j=0; j < analysisData[i].children.length; j++)
      {
        if(traitMax[i])
        {
          traitMax[i] += analysisData[i].children[j].percentage;
        }
        else {
          traitMax[i] = analysisData[i].children[j].percentage;
        }
      }
    }
    for(var i=0; i < traitMax.length; i++)
    {
      fullMax += traitMax[i];
    }

   for (var i = 0; i < analysisData.length; i ++) {

       // add browser data
       categoryData.push({
           name: analysisData[i].id,
           y: parseFloat(((traitMax[i] / fullMax) * 100).toFixed(2)),
           color: colors[i]
       });

       for(var j=0; j < analysisData[i].children.length; j++)
       {
         traitData.push({
             name: analysisData[i].children[j].id,
             y: parseFloat(((analysisData[i].children[j].percentage / fullMax) * 100).toFixed(2)),
             color: colors[i]
         });
       }

     }

     //console.log(categoryData);

    return {
      options: {
        chart: {
            backgroundColor: '#275675',
            type: 'pie'
        },
        title: {
            style: {
               color: '#FFFDF4',
            },
            text: 'Dream Analysis'
        },
        subtitle: {
          style: {
             color: '#FFFDF4',
          },
            text: 'Source: DreamStream via IBM Watson'
        },
        yAxis: {
            title: {
                text: 'Total percent Dreams'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
      },
        series: [{
            name: 'Categories',
            data: categoryData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#FFFDF4',
                distance: -30
            }
        }, {
            name: 'Traits',
            data: traitData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 100 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                }
            }
        }]
    };
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
        if (dreamArr[i] === '') {
          dreamArr.splice(i, 1);
          i--;
        } else {
          dreamArr[i] = dreamArr[i].toLowerCase();
        }

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
        .font("Lato").fontSize(function(d) {
          // console.log(d)
          return d.size;
        })
        .on("end", draw).start();

      function draw(words) {
        d3.select("#word-cloud").append("svg").attr("width", 350).attr("height", 350).append("g").attr("transform", "translate(175,175)").selectAll("text").data(words).enter().append("text").style("font-size", function(d) {
          return d.size + "px";
        }).style("font-family", "Lato").style("font-weight", "900").style("fill", function(d, i) {
          return fill(i);
        }).attr("text-anchor", "middle").attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        }).text(function(d) {
          return d.text;
        });
      }
    }
  };
}

function scatterService() {
  return {
    show: function(data) {
      // just to have some space around items.
      var margins = {
        "left": 40,
        "right": 30,
        "top": 30,
        "bottom": 30
      };

      var width = 350;
      var height = 450;

      // this will be our colour scale. An Ordinal scale.
      var colors = d3.scale.category10();

      // we add the SVG component to the scatter-load div
      var svg = d3.select("#scatter-load").append("svg").attr("width", width).attr("height", height).append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

      // this sets the scale that we're using for the X axis.
      // the domain define the min and max variables to show. In this case, it's the min and max prices of items.
      // this is made a compact piece of code due to d3.extent which gives back the max and min of the price variable within the dataset
      var x = d3.scale.linear()
        .domain(d3.extent(data, function(d) {
          return d.mood;
        }))
        // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
        .range([0, width - margins.left - margins.right]);

      // this does the same as for the y axis but maps from the rating variable to the height to 0.
      var y = d3.scale.linear()
        .domain(d3.extent(data, function(d) {
          return d.rating;
        }))
        // Note that height goes first due to the weird SVG coordinate system
        .range([height - margins.top - margins.bottom, 0]);

      // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
      svg.append("g").attr("class", "y axis").attr("transform", "translate(0," + x.range()[0] + ")");

      // this is our X axis label. Nothing too special to see here.
      svg.append("text")
        .attr("fill", "#fffdf4")
        .attr("text-anchor", "end")
        .attr("x", 425)
        .attr("y", height - 70)
        .text("Mood");


      svg.append("text")
        .attr("fill", "#fffdf4")
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "end")
        .attr("dy", ".71em")
        .attr("y", 6)
        .text("Rating");


      // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
      var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
      var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

      // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
      svg.selectAll("g.y.axis").call(yAxis);
      svg.selectAll("g.x.axis").call(xAxis);

      // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
      var dream = svg.selectAll("g.node").data(data, function(d) {
        return d.id;
      });

      // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.

      var dreamGroup = dream.enter().append("g").attr("class", "node")
        // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
        .attr('transform', function(d) {
          return "translate(" + x(d.mood) + "," + y(d.rating) + ")";
        });

      // we add our first graphics element! A circle!
      // var formatTime = d3.dateTime.format("%e %B");

      var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      dreamGroup.append("circle")
        .attr("r", 10)
        .attr("class", "dot")
        .attr("on-touch", "onTouch()")
        .attr("class", "button")
        .style("fill", function(d) {
          // remember the ordinal scales? We use the colors scale to get a colour for our manufacturer. Now each node will be coloured
          // by who makes the chocolate.
          return colors(d.id);
        })
        .on("mouseover", function(d) {
          console.log(d)
          div.transition()
            .duration(200)
            .style("opacity", 0.9);
          div.html((d.dateTime) + "<br/>" + d.close)
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
        .text(function(d) {
          // this shouldn't be a surprising statement.
          var splitDate = d.dateTime.slice(0, 10);
            //  console.log(splitDate)
          return splitDate;
        });
    }
  };
}

function CustomFilters($http, dbURL, $state) {
  return {
    add: function(word) {
      return $http.post(dbURL.url + '/filters', word)
        .then(function(response) {
          $state.go($state.current, {}, {reload: true});
          console.log(response);
          return response;
        }, function(error) {
          return error;
        });
    },
    get: function(){
      return $http.get(dbURL.url + '/filters/specific')
      .then(function(response){
        // console.log(response.data);
        return response.data;
      }, function(error){
        return error;
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
// return {
//   showPie: function(data) {
//
//     var w = 400;
//     var h = 400;
//     var r = h/2;
//     var color = d3.scale.category20c();
//     var moodTotal = [];
//     var total = {};
//
//
//     var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
//
//
//     var pie = d3.layout.pie().value(function(d, total){
//       console.log(d.mood);
//       moodTotal.push(d.mood);
//       console.log(moodTotal);
//       moodTotal.reduce(function (total, current) {
//         if (typeof total[current] == 'undefined') {
//           total[current] = 1;
//           } else {
//             total[current] += 1;
//           }
//           console.log(total);
//           //secTotal = total;
//           return total;
//          }, {});
//          console.log(moodTotal);
//       return total;
//     });
//
//
//     // declare an arc generator function
//     var arc = d3.svg.arc().outerRadius(r);
//
//     // select paths, use arc generator to draw
//     var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
//     arcs.append("svg:path")
//         .attr("fill", function(d, i){
//             return color(i);
//         })
//         .attr("d", function (d) {
//             // log the result of the arc generator to show how cool it is :)
//             // console.log(arc(d));
//             return arc(d);
//         });
//
//     // add the text
//     arcs.append("svg:text").attr("transform", function(d){
//     			d.innerRadius = 0;
//     			d.outerRadius = r;
//         return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
//         return data[i].mood;}
//     		);
//       }
//     }
// }
