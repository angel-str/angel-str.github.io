var h = window.innerHeight;
var w = window.innerWidth;

var canvas = document.getElementById("canvas");
canvas.width=w;
canvas.height=h;
var ctx = canvas.getContext("2d");
ctx.fillStyle="rgb(255,100,100,0.5)";

var amountOfBalls=100;

var xSpeed=[0];
for (var i = 0; i < amountOfBalls; i++) {
  xSpeed[i] = getRndInteger(30,60);
  if(getRndInteger(1,2)==2){
    xSpeed[i]=xSpeed[i]*-1;
  }
}
var ySpeed=[1,1,1,1,1];
for (var i = 0; i < amountOfBalls; i++) {
  ySpeed[i] = getRndInteger(1,3);
  if(getRndInteger(1,2)==2){
    ySpeed[i]=ySpeed[i]*-1;
  }
}

var g=4;

var x =[0];
for (var i = 0; i < amountOfBalls; i++) {
  x[i]=getRndInteger(w/2 -500, w/2 + 500);
}
var y =[0];
for (var i = 0; i < amountOfBalls; i++) {
  y[i]=getRndInteger(50,h/2);
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function paintAll(){
  ctx.clearRect(0,0,w,h);
  update();
  for(var i = 0; i<amountOfBalls; i++){
    paint(x[i],y[i]);
  }
}
function paint(a,b) {
  ctx.beginPath();
  ctx.arc(a,b,50,0,2*Math.PI);
  ctx.fill();
}



function update(){
  for(var i =0; i<amountOfBalls; i++){

      if(y[i]>h-50){
        ySpeed[i]=ySpeed[i]*-1;
      }else if (y[i]<50) {
        ySpeed[i]=ySpeed[i]*-1;
      }
      if(x[i]>w-50){
        xSpeed[i]=xSpeed[i]*-1;
      }else if (x[i]<50) {
        xSpeed[i]=xSpeed[i]*-1;
      }else{

      }

      ySpeed[i]=ySpeed[i]+g;
      y[i]=y[i]+ySpeed[i];
      x[i]=x[i]+xSpeed[i];

      if(y[i]>h+ySpeed[i]){
        y[i]=h-50;
      }
  }
}



setInterval(paintAll,40);
