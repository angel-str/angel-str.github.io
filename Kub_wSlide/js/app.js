/*--------------VARIABLES--------------*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;

const updFre = 20;

const scaler = 1.7;

var cube3D = [];
const depth = 6;
const height = 6;
const width = 6;
const spacer = 10 * scaler;

const right = calcRight();
const down = calcDown();
const away = 100;
console.log(away);

const radie = 2 * scaler;
const ballColor = "rgb(255,255,255)";
const shadowColor = "cyan";
const shadowColorSide = "white";
//const shadowColorEdge = "black";
const shadowColorCorner = "black";

var v = 0;
var v_rateOfChange = -0.015;
const eyeDistance = 10000;


/*NYA GREJER*/
var staticCube = [];
var sizeAngle = 0;
var sizeAngle_rateOfChange = 0.04;
var lengthVar;
var expantionAmplitude = 0.3;
var expandMinValue = 1;
/*---------------*/

/*--------------UPDATE/ROTATE--------------*/
function update(){
  v+=v_rateOfChange;
  sizeAngle+=sizeAngle_rateOfChange;
  lengthVar = expantionAmplitude*Math.sin(sizeAngle*2)+expandMinValue;
  rotateXY();
  rotateYZ();
  paintAllBalls();
}

/*--------------CALC POSITION--------------*/
function calcRight(){
  let wCube = width * spacer;
  return (document.getElementById("canvas").width - wCube)/2;
}
function calcDown(){
  let hCube = height * spacer;
  return (document.getElementById("canvas").height - hCube)/2;
}

/*--------------CUBE--------------*/
for(var z = 0; z < depth; z++){
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      cube3D.push({
        x:x*spacer + right,
        y:y*spacer + down,
        z:z*spacer + away
      });
      //NYA GREJER
      if (z == 0 || z == depth-1 || y == 0 || y == height-1 || x == 0 || x == width-1) {
        if (
          (z == 0 && y == 0 && x == 0) ||
          (z == depth -1 && y == 0 && x == 0) ||
          (z == 0 && y == height-1 && x == 0) ||
          (z == 0 && y == 0 && x == width-1) ||
          (z == 0 && y == height-1 && x == width-1) ||
          (z == depth-1 && y == height-1 && x == 0) ||
          (z == depth -1 && y == 0 && x == width-1) ||
          (z == depth -1 && y == height-1 && x == width-1)) {
          staticCube.push({
            x:x*spacer + right,
            y:y*spacer + down,
            z:z*spacer + away,
            color: shadowColorCorner
          });
        }else{
          staticCube.push({
            x:x*spacer + right,
            y:y*spacer + down,
            z:z*spacer + away,
            color: shadowColorSide
          });
        }
      }else{
        staticCube.push({
          x:x*spacer + right,
          y:y*spacer + down,
          z:z*spacer + away,
          color: shadowColor
        });
      }
    }
  }
}

var xPlane = (getHighX() + getLowX())/2;
var yPlane = (getHighY() + getLowY())/2;
var zPlane = (getHighZ() + getLowZ())/2;

function getHighX(){
  let max = cube3D[0].x;
  cube3D.forEach((ball, cube3D) => {
    if(ball.x>max){
      max = ball.x;
    }
  });
  return max;
}
function getLowX(){
  let min = cube3D[0].x;
  cube3D.forEach((ball, cube3D) => {
    if(ball.x<min){
      min = ball.x;
    }
  });
  return min;
}
function getHighY(){
  let max = cube3D[0].y;
  cube3D.forEach((ball, cube3D) => {
    if(ball.y>max){
      max = ball.y;
    }
  });
  return max;
}
function getLowY(){
  let min = cube3D[0].y;
  cube3D.forEach((ball, cube3D) => {
    if(ball.y<min){
      min = ball.y;
    }
  });
  return min;
}
function getHighZ(){
  let max = cube3D[0].z;
  cube3D.forEach((ball, cube3D) => {
    if(ball.z>max){
      max = ball.z;
    }
  });
  return max;
}
function getLowZ(){
  let min = cube3D[0].z;
  cube3D.forEach((ball, cube3D) => {
    if(ball.z<min){
      min = ball.z;
    }
  });
  return min;
}


/*--------------ROTATION--------------*/
function rotateXY(){
  let counter = 0;
  cube3D.forEach((ball, cube3D) => {
    let x = ball.x - xPlane;
    let y = ball.y - yPlane;

    staticCube[counter].x = xPlane + x*Math.cos(v)*lengthVar - y*Math.sin(v)*lengthVar;
    staticCube[counter].y = yPlane + x*Math.sin(v)*lengthVar + y*Math.cos(v)*lengthVar;

    counter++;
  });
}
function rotateYZ(){
  let counter = 0;
  cube3D.forEach((ball, cube3D) => {
    let y = staticCube[counter].y - yPlane;
    let z = ball.z - zPlane;

    staticCube[counter].y = yPlane + z*Math.sin(v)*lengthVar + y*Math.cos(v)*lengthVar;
    staticCube[counter].z = zPlane + z*Math.cos(v)*lengthVar - y*Math.sin(v)*lengthVar;

    counter++;
  });
}


/*--------------transform--------------*/
function from3Dto2d(coord3d){

  let cube2D = [];

  coord3d.forEach((ball, coord3d) => {

    let x = ball.x - xPlane;
    let y = ball.y - yPlane;
    let z = ball.z;

    cube2D.push({
      x: xPlane + (x * eyeDistance)/(eyeDistance + z),    //*eyeDistance istället för z?
      y: yPlane + (y * eyeDistance)/(eyeDistance + z),
      z: z,
      color: ball.color
    });
  });

  return cube2D;
}



/*--------------BALL--------------*/

function paintAllBalls(){
  ctx.clearRect(0,0,w,h);

  from3Dto2d(staticCube)

  .sort(function(a, b) {
    return b.z - a.z;
  })

  .forEach((ball, cube2D) => {
    paintBall(ball.x,ball.y,ball.color);
  });
}

function paintBall(X,Y, color){
  ctx.beginPath();
  if(color == shadowColorCorner){
    ctx.fillStyle = color;
  }
  else {
    ctx.fillStyle = ballColor;
  }
  ctx.arc(X,Y,radie,0,2*Math.PI);
  ctx.shadowBlur = radie;
  ctx.shadowColor = color;
  ctx.fill();
}

/*--------------TIMER--------------*/
setInterval(update,updFre);
