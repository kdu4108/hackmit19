window.onload = function() {
  var xData = {title: 'Time (minutes)', data: formatTimes(speedMPGData.timestamp)};
  var yData = [{title: 'Speed (kph)' , data: speedMPGData.vehicle_speed}, {title: 'Instantaneous MPG', data: speedMPGData.instantaneous_mpg}];
  drawLineChart(xData, yData, subcity + ' Speed and MPG Data', 'subcitycanvas');
};
