var drawCity = function(cityName, cityLocation, relativePollutionLevel, color, ctx) {
  ctx.beginPath();
  ctx.arc(cityLocation[0], cityLocation[1], maxRadius * relativePollutionLevel, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.strokeStyle = 'dark ' + color;
  ctx.stroke();
  ctx.fill();
}


window.onload = function() {
  var c = document.getElementById("citycanvas");
  w = c.width;
  h = c.height;
  newYorkLocation = [w/4, h/4];
  taiwanLocation = [3 * w/4, h/4];
  delhiLocation = [w/2, 3 * h/4];
  maxRadius = Math.min(w/4, h/4);
  var ctx = c.getContext("2d");
  ctx.rect(0, 0, ctx.width, ctx.height);
  drawCity("New York", newYorkLocation, 0.8, 'red', ctx);
  drawCity("Taiwan", taiwanLocation, 0.6, 'blue', ctx);
  drawCity("Delhi", delhiLocation, 1, 'green', ctx);
}
