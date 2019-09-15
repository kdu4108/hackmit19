var time = timeVsSpeed.timestamp;
var speed = timeVsSpeed.vehicle_speed;
var firstTime = time[0];
time = time.map((t)=>moment.unix(t-firstTime).format('m:ss'));

var drawLineChart = function(x, ys, title, canvasID) {
  var config = {
      type: 'line',
      data: {
          labels: x.data,
          datasets: ys.map(function(y, i) {
            return {
              label: x.title + ' vs' + y.title,
              backgroundColor: window.chartColors[Object.keys(window.chartColors)[i]],
              borderColor: window.chartColors[Object.keys(window.chartColors)[i]],
              data: y.data,
              fill: false
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
              yAxes: ys.map(function(y) {
                return {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: y.title
                  }
                }
              })
          }
      }
  };
  var ctx = document.getElementById(canvasID).getContext('2d');
  new Chart(ctx, config);
}

var drawBarChart=function(canvasID) {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var color = Chart.helpers.color;
    var barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }, {
            label: 'Dataset 2',
            backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }]
    };
    var ctx = document.getElementById(canvasID).getContext('2d');
    new Chart(ctx, barChartData);
}


window.onload = function() {
  drawLineChart({title: 'Time (minutes)', data: time}, [{title: 'Speed (kph)', data: speed}], 'Highway Speed', 'canvas');
  this.drawBarChart('newCanvas')
  // drawLineChart(time, speed, 'Highway Speed', 'Time (minutes)', 'Speed (kph)', false, 'canvas');
    // var ctx = document.getElementById('canvas').getContext('2d');
    // window.myLine = new Chart(ctx, config);
};
/*document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return randomScalingFactor();
        });
    });
    window.myLine.update();
});*/
var colorNames = Object.keys(window.chartColors);
/*document.getElementById('addDataset').addEventListener('click', function() {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];
    var newDataset = {
        label: 'Dataset ' + config.data.datasets.length,
        backgroundColor: newColor,
        borderColor: newColor,
        data: [],
        fill: false
    };
    for (var index = 0; index < config.data.labels.length; ++index) {
        newDataset.data.push(randomScalingFactor());
    }
    config.data.datasets.push(newDataset);
    window.myLine.update();
});*/
/*document.getElementById('addData').addEventListener('click', function() {
    if (config.data.datasets.length > 0) {
        var month = MONTHS[config.data.labels.length % MONTHS.length];
        config.data.labels.push(month);
        config.data.datasets.forEach(function(dataset) {
            dataset.data.push(randomScalingFactor());
        });
        window.myLine.update();
    }
});
document.getElementById('removeDataset').addEventListener('click', function() {
    config.data.datasets.splice(0, 1);
    window.myLine.update();
});
document.getElementById('removeData').addEventListener('click', function() {
    config.data.labels.splice(-1, 1); // remove the label first
    config.data.datasets.forEach(function(dataset) {
        dataset.data.pop();
    });
    window.myLine.update();
});*/
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var color = Chart.helpers.color;
var barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }, {
        label: 'Dataset 2',
        backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
        borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }]
};