console.log("Connected");

/*--------------VARIABLER--------------*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var w=window.innerWidth;
var h=window.innerHeight;

const updFre = 20;

const scaler = 1.7;

var kub3D = [];
const right = 100;
const down = 100;
const away = 100;
const depth = 6;
const height = 6;
const width = 6;
const spacer = 10 * scaler;

const radie = 2 * scaler;
const ballColor = "rgb(255,255,255)";
const shadowColor = "cyan";

const v = 0.8 * (Math.PI/180);
const eyeDistance = 50;

/*--------------UPDATE/ROTATE--------------*/
function update(){
  rotateXY();
  rotateYZ();
  paintAllBalls();
}

/*--------------KUB--------------*/
for(var z = 0; z < depth; z++){
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      kub3D.push({
        x:x*spacer + right,
        y:y*spacer + down,
        z:z*spacer + away
      });
    }
  }
}

var xPlane = (getHighX() - getLowX())/2 + getLowX();
var yPlane = (getHighY() - getLowY())/2 + getLowY();
var zPlane = (getHighZ() - getLowZ())/2 + getLowZ();

function getHighX(){
  let max = kub3D[0].x;
  kub3D.forEach((ball, kub3D) => {
    if(ball.x>max){
      max = ball.x;
    }
  });
  return max;
}
function getLowX(){
  let min = kub3D[0].x;
  kub3D.forEach((ball, kub3D) => {
    if(ball.x<min){
      min = ball.x;
    }
  });
  return min;
}
function getHighY(){
  let max = kub3D[0].y;
  kub3D.forEach((ball, kub3D) => {
    if(ball.y>max){
      max = ball.y;
    }
  });
  return max;
}
function getLowY(){
  let min = kub3D[0].y;
  kub3D.forEach((ball, kub3D) => {
    if(ball.y<min){
      min = ball.y;
    }
  });
  return min;
}
function getHighZ(){
  let max = kub3D[0].z;
  kub3D.forEach((ball, kub3D) => {
    if(ball.z>max){
      max = ball.z;
    }
  });
  return max;
}
function getLowZ(){
  let min = kub3D[0].z;
  kub3D.forEach((ball, kub3D) => {
    if(ball.z<min){
      min = ball.z;
    }
  });
  return min;
}



function rotateXY(){
  kub3D.forEach((ball, kub3D) => {
    let x = ball.x - xPlane;
    let y = ball.y - yPlane;

    ball.x = xPlane + x*Math.cos(v) - y*Math.sin(v);
    ball.y = yPlane + x*Math.sin(v) + y*Math.cos(v);
  });
}
function rotateYZ(){
  kub3D.forEach((ball, kub3D) => {
    let y = ball.y - yPlane;
    let z = ball.z - zPlane;

    ball.y = yPlane + z*Math.sin(v) + y*Math.cos(v);
    ball.z = zPlane + z*Math.cos(v) - y*Math.sin(v);
  });
}



function from3Dto2d(coord3d){

  let kub2D = [];

  coord3d.forEach((ball, coord3d) => {

    let x = ball.x - xPlane;
    let y = ball.y - yPlane;
    let z = ball.z;

    kub2D.push({
      x: xPlane + x/(eyeDistance + z) * z,
      y: yPlane + y/(eyeDistance + z) * z
    });
  });

  return kub2D;
}



/*--------------BALL--------------*/

function paintAllBalls(){
  ctx.clearRect(0,0,w,h);
  from3Dto2d(kub3D).forEach((ball, kub2D) => {
    paintBall(ball.x,ball.y);
  });
}

function paintBall(X,Y){
  ctx.beginPath();
  ctx.fillStyle = ballColor;
  ctx.arc(X,Y,radie,0,2*Math.PI);
  ctx.shadowBlur = radie;
  ctx.shadowColor = shadowColor;
  ctx.fill();
}

/*--------------TIMER--------------*/
setInterval(update,updFre);
