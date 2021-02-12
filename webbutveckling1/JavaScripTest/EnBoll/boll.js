console.log("test");
//Slumpa fram antalet bollar med olika start position


var canvas=document.getElementById("canvas")
var ctx = canvas.getContext("2d");

var x=50;
var y=50;
var w=window.innerWidth;
var h=window.innerHeight;
var xSpeed=30;
var ySpeed=1;
var g=3;

canvas.width=w;
canvas.height=h;


ctx.fillStyle="rgb(0,0,0, 0.8)";


function update(){

  if(y>h+50){
    y=h-50;
  }else{
    if(y>h-50){
      ySpeed=ySpeed*-1;
    }else if (y<50) {
      ySpeed=ySpeed*-1;
    }
    if(x>w-50){
      xSpeed=xSpeed*-1;
    }else if (x<50) {
      xSpeed=xSpeed*-1;
    }else{

    }

    ySpeed=ySpeed+g;
    y=y+ySpeed;
    x=x+xSpeed;
  }
} 
function paint() {
  update();
  ctx.clearRect(0,0,w,h);
  ctx.beginPath();
  ctx.arc(x,y,50,0,2*Math.PI);
  ctx.fill();
  console.log(y);
}

setInterval(paint,5);
