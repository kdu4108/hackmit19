var time = timeVsSpeed.timestamp;
var speed = timeVsSpeed.vehicle_speed;
var firstTime = time[0];
time = time.map((t)=>moment.unix(t-firstTime).format('m:ss'));

var drawLineChart = function(x, y, title, xTitle, yTitle, showLegend, canvasID) {
  var config = {
      type: 'line',
      data: {
          labels: x,
          datasets: [{
              label: xTitle + ' vs ' + yTitle,
              backgroundColor: window.chartColors.red,
              borderColor: window.chartColors.red,
              data: y,
              fill: false,
            }]
          // }, {
          //     label: 'time vs variable two',
          //     fill: false,
          //     backgroundColor: window.chartColors.blue,
          //     borderColor: window.chartColors.blue,
          //     data: variableTwo,
          // }]
      },
      options: {
          legend: {
            display: showLegend
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
                      labelString: xTitle
                  }
              }],
              yAxes: [{
                  display: true,
                  scaleLabel: {
                      display: true,
                      labelString: yTitle
                  }
              }]
          }
      }
  };
  var ctx = document.getElementById(canvasID).getContext('2d');
  new Chart(ctx, config);
}


window.onload = function() {
  drawLineChart(time, speed, 'Highway Speed', 'Time (minutes)', 'Speed (kph)', false, 'canvas');
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
