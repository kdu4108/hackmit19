$(function() {
    var img = $("#car"),
        width = img.get(0).width,
        screenWidth = $(window).width(),
        duration = 5000;

    function animatePlane() {
        img.css("left", -width).animate({
            "left": screenWidth
        }, duration, animatePlane);
        return;
    }

    function animateSkyline() {
      var skyline = $('#skyline');

      var pos = skyline.css( "background-position" ).split( " " );


  		var x = parseInt( pos[0], 10 ) || 0;
  		var y = parseInt( pos[1], 10 ) || 0;


      skyline.animate({
        x: x,
        y: y
      }, 10000, 'linear');

    }

    setTimeout(function(){
        document.getElementById('cloud1container').style.visibility = 'visible';
    },3000);
    setTimeout(function(){
        document.getElementById('cloud2container').style.visibility = 'visible';
    },4500);
    setTimeout(function(){
        document.getElementById('car').style.visibility = 'hidden';
    },5000);    // var cloud1 = $("#cloud1"),
    // width = cloud1.get(0).width,
    // screenWidth = $(window).width(),
    // duration = 8000;
    // // var cloud2 = $("#cloud1"),
    // // width = cloud2.get(0).width,
    // // screenWidth = $(window).width(),
    // // duration = 5000;

    // function animateClouds() {
    //     cloud1.css("left", -width).animate({
    //         "left": screenWidth
    //     }, duration, animateClouds);
    //     // cloud2.css("left", -width).animate({
    //     //     "left": screenWidth
    //     // }, duration, animateClouds);
    // }

    animatePlane();//.thenReturn(animateClouds());
    // animateSkyline();
    // animateClouds();
});
