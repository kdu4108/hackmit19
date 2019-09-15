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

var colorNames = Object.keys(window.chartColors);
