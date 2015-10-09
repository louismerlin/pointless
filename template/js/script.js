var bgE = document.getElementById("background"),
  bgC = document.getElementById("background").getContext("2d"),
  drawingE = document.getElementById("drawing"),
  drawingC = document.getElementById("drawing").getContext("2d"),
  tdE = document.getElementById("tempDrawing"),
  tdC = document.getElementById("tempDrawing").getContext("2d"),
  interfaceE = document.getElementById("interface"),
  interfaceC = document.getElementById("interface").getContext("2d"),
  selectedDot = null,
  image = [],
  redoImage = [];

//BACKGROUND

bgC.fillStyle = "#f5eeeb";
bgC.fillRect(0, 0, 640, 640);

//INTERFACE

interfaceC.fillStyle = "#3B3228";

//CHECK THIS FUNCTION IF COMPATIBILITY ISSUES
/*
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}*/

interfaceE.addEventListener('mousemove', function(e) {
  //var mousePos = getMousePos(interfaceE, e);
  drawDots(e.layerX, e.layerY);
  if (selectedDot != null) {
    interfaceC.fillRect(selectedDot.x * 20 + 8, selectedDot.y * 20 + 8, 4, 4);
    drawTempLine(e.layerX, e.layerY);
  }
}, false);

interfaceE.addEventListener('mousedown', function(e) {
  var tempDot = {
    x: Math.floor(e.layerX / 20),
    y: Math.floor(e.layerY / 20),
  }
  tdC.clearRect(0, 0, 640, 640);
  selectedDot = tempDot;
}, false);

interfaceE.addEventListener('mouseup', function(e) {
  var tempDot = {
    x: Math.floor(e.layerX / 20),
    y: Math.floor(e.layerY / 20),
  }
  addLine(tempDot);
  selectedDot = null;
}, false);

drawDots = function(x, y) {
  interfaceC.clearRect(0, 0, 640, 640);
  for (var i = 0; i < 32; i++) {
    for (var j = 0; j < 32; j++) {
      interfaceC.fillRect(i * 20 + 9, j * 20 + 9, 2, 2);
    }
  }
  interfaceC.fillRect(Math.floor(x / 20) * 20 + 8, Math.floor(y / 20) * 20 + 8, 4, 4);
}

drawDots(-1, -1);

//TEMPDRAWING

tdC.lineWidth = 2;
tdC.strokeStyle = "#3B3228";
drawTempLine = function(x, y) {
  tdC.clearRect(0, 0, 640, 640);
  tdC.beginPath();
  tdC.moveTo(selectedDot.x * 20 + 10, selectedDot.y * 20 + 10);
  tdC.lineTo(Math.floor(x / 20) * 20 + 10, Math.floor(y / 20) * 20 + 10);
  tdC.stroke();
}

//DRAWING

drawingC.strokeStyle = "#3B3228";
addLine = function(dot) {
  image.push({
    "x1": selectedDot.x,
    "y1": selectedDot.y,
    "x2": dot.x,
    "y2": dot.y
  });
  redoImage = [];
  drawImage(image);
}

drawImage = function(im) {
  drawingC.clearRect(0, 0, 640, 640);
  for (var i = 0; i < im.length; i++) {
    drawingC.beginPath();
    drawingC.moveTo(im[i].x1 * 20 + 10, im[i].y1 * 20 + 10);
    drawingC.lineTo(im[i].x2 * 20 + 10, im[i].y2 * 20 + 10);
    drawingC.stroke();
  }
  tdC.clearRect(0, 0, 640, 640);
}

importImage = function(im) {
  //console.log(im);
}
importImage(imageLine);

undo = function() {
  redoImage.push(image.pop());
  drawImage(image);
}

redo = function() {
  if (redoImage.length!=0) {
    image.push(redoImage.pop());
    drawImage(image);
  }
}
