var t2 = 0;
var t3 = 360;
var t4 = 720;

$(function(){
  gbwDicesFloating();

  // video popup
  $('.gbw-video__link').click(function(){
    showPopup('#gbw-video-popup');
    $('#gbw-video').get(0).play();
  });

  moveitDice2();
  moveitDice3();
  moveitDice4();
});

function moveitDice2(element) {
  t2 += 0.0005;

  var r, xcenter, ycenter;
  if($(window).width() > 640 && $(window).width() < 1260) {
    r = 360;
    xcenter = 270;
    ycenter = 260;
  } else if($(window).width() < 640) {
    r = 170;
    xcenter = 130;
    ycenter = 120;
  } else {
    r = 450;
    xcenter = 360;
    ycenter = 350;
  }

  var newLeft = Math.floor(xcenter + (r * Math.cos(t2)));
  var newTop = Math.floor(ycenter + (r * Math.sin(t2)));

  $('.dice--2').animate({
    top: newTop,
    left: newLeft
  }, 1, function () {
    moveitDice2();
  });
}
function moveitDice3(element) {
  t3 += 0.0005;

  var r, xcenter, ycenter;
  if ($(window).width() > 640 && $(window).width() < 1260) {
    r = 360;
    xcenter = 270;
    ycenter = 260;
  } else if ($(window).width() < 640) {
    r = 170;
    xcenter = 130;
    ycenter = 120;
  } else {
    r = 450;
    xcenter = 360;
    ycenter = 350;
  }

  var newLeft = Math.floor(xcenter + (r * Math.cos(t3)));
  var newTop = Math.floor(ycenter + (r * Math.sin(t3)));

  $('.dice--3').animate({
    top: newTop,
    left: newLeft
  }, 1, function () {
    moveitDice3();
  });
}
function moveitDice4(element) {
  t4 += 0.0005;

  var r, xcenter, ycenter;
  if ($(window).width() > 640 && $(window).width() < 1260) {
    r = 360;
    xcenter = 270;
    ycenter = 260;
  } else if ($(window).width() < 640) {
    r = 170;
    xcenter = 130;
    ycenter = 120;
  } else {
    r = 450;
    xcenter = 360;
    ycenter = 350;
  }

  var newLeft = Math.floor(xcenter + (r * Math.cos(t4)));
  var newTop = Math.floor(ycenter + (r * Math.sin(t4)));

  $('.dice--4').animate({
    top: newTop,
    left: newLeft
  }, 1, function () {
    moveitDice4();
  });
}