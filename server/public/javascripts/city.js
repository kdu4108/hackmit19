console.log(MPGData);
window.onload = function() {
  drawBarChart({title: 'Location/Route', labels: MPGData.Subcity}, [{title: 'MPG', data: MPGData.MPG}], 'MPG in ' + cityName, 'mpgcanvas');
}
