var formatTimes = function(times) {
  firstTime = times[0];
  return times.map((t)=>moment.unix(t-firstTime).format('m:ss'));
}

var nthColor = function(n, total) {
  var colors = Object.keys(window.chartColors);
  n = n % colors.length;
  if (total != undefined) {
    spacing = colors.length/total;
    n = parseInt(n * spacing);
  }
  return window.chartColors[colors[n]];
}

var randomArray = function(n) {
  arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(randomScalingFactor());
  }
  return arr;
}

var displaySide = function(n) {
  return n % 2 == 0 ? 'left' : 'right';
}

var displayGrid = function(n) {
  return n == 0;
}


var drawLineChart = function(x, ys, title, canvasID) {
  var config = {
      type: 'line',
      data: {
          labels: x.data,
          datasets: ys.map(function(y, i) {
            return {
              label: y.title,
              backgroundColor: nthColor(i, ys.length),
              borderColor: nthColor(i, ys.length),
              data: y.data,
              fill: false,
              yAxisID: i
            }
          })
      },
      options: {
          legend: {
            display: ys.length > 1
          },
          responsive: true,
          title: {
              display: true,
              text: title
          },
          tooltips: {
              mode: 'index',
              intersect: false,
          },
          hover: {
              mode: 'nearest',
              intersect: true
          },
          scales: {
              xAxes: [{
                  display: true,
                  scaleLabel: {
                      display: true,
                      labelString: x.title
                  }
              }],
              yAxes: ys.map(function(y, i) {
                return {
                  type: 'linear',
                  display: true,
                  position: displaySide(i, ys.length),
                  id: i,
                  scaleLabel: {
                    display: true,
                    labelString: y.title
                  },
                  gridLines: {
                    drawOnChartArea: displayGrid(i)
                  }
                }
              })
          }
      }
  };
  var ctx = document.getElementById(canvasID).getContext('2d');
  new Chart(ctx, config);
}

var drawBarChart = function(x, ys, title, canvasID) {
    var color = Chart.helpers.color;
    var config = {
      type: 'bar',
      data: {
          labels: x.labels,
          datasets: ys.map(function(y, i) {
            return {
              label: y.title,
              backgroundColor: color(nthColor(i, ys.length)).alpha(0.5).rgbString(),
              borderColor: nthColor(i, ys.length),
              borderWidth: 1,
              data: y.data
            }
          }),
      },
      options: {
        responsive: true,
        legend: {
          display: ys.length > 1,
          position: 'top'
        },
        title: {
          display: true,
          text: title
        }
      }
    }
    var ctx = document.getElementById(canvasID).getContext('2d');
    new Chart(ctx, config);
}


window.onload = function() {
  console.log(csvDatas);
  for (var i = 0; i < names.length; i++) {
    time = csvDatas[i].timestamp;
    speed = csvDatas[i].vehicle_speed;
    mpg = csvDatas[i].instantaneous_mpg;
    name = names[i];
    var xData = {title: 'Time (minutes)', data: formatTimes(time)};
    var yData = [{title: 'Speed (kph)' , data: speed}, {title: 'Instantaneous MPG', data: mpg}];
    drawLineChart(xData, yData, name, 'canvas' + i);
  }
  // drawLineChart({title: 'Time (minutes)', data: time}, [{title: 'Speed (kph)', data: speed}], 'Highway Speed', 'canvas');
  // drawBarChart({title: 'Example', labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']}, [{title: 'Dataset 1', data: randomArray(7)}, {title: 'Dataset 2', data: randomArray(7)}], 'Example Bar Chart', 'newCanvas')
};

var colorNames = Object.keys(window.chartColors);
