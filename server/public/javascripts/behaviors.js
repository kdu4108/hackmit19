window.onload = function() {
  for (var i = 0; i < names.length; i++) {
    time = csvDatas[i].timestamp;
    speed = csvDatas[i].vehicle_speed;
    mpg = csvDatas[i].instantaneous_mpg;
    name = names[i];
    var xData = {title: 'Time (minutes)', data: formatTimes(time)};
    var yData = [{title: 'Speed (kph)' , data: speed}, {title: 'Instantaneous MPG', data: mpg}];
    drawLineChart(xData, yData, name, 'canvas' + i);
  }
  drawBarChart({title: 'Driving Behavior', labels: mpgData['Behavior']}, [{title: 'MPG', data: mpgData['MPG']}], 'Driving Behavior vs MPG', 'canvasMPG')
};
