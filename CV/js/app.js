console.log("Connected");
var jsHide_var = document.getElementsByClassName("jsHide");
jsHide_var[0].style.display = "none";

var jsShow_var = document.getElementsByClassName("jsShow");
jsShow_var[0].style.display = "block";

//KOLLA MED DANILE OM UPPE


var hamBtn = document.getElementById("listSvg");
var trackerNav = true;
hamBtn.style.transition = "0.5s ease-in-out";
hamBtn.addEventListener("click",navSlide);
function navSlide(){
  if(trackerNav){
    document.getElementsByTagName("nav")[0].style.transform = "translateX(0%)";
    trackerNav = false;
  }else{
    document.getElementsByTagName("nav")[0].style.transform = "translateX(100%)";
    trackerNav = true;
  }
}


/*KUB*/


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
const away = down;

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
      if (z == 0 || z == depth-1 || y == 0 || y == height-1 || x == 0 || x == width-1) {
        cube3D.push({
          x:x*spacer + right,
          y:y*spacer + down,
          z:z*spacer + away
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



function rotateXY(){
  cube3D.forEach((ball, cube3D) => {
    let x = ball.x - xPlane;
    let y = ball.y - yPlane;

    ball.x = xPlane + x*Math.cos(v) - y*Math.sin(v);
    ball.y = yPlane + x*Math.sin(v) + y*Math.cos(v);
  });
}
function rotateYZ(){
  cube3D.forEach((ball, cube3D) => {
    let y = ball.y - yPlane;
    let z = ball.z - zPlane;

    ball.y = yPlane + z*Math.sin(v) + y*Math.cos(v);
    ball.z = zPlane + z*Math.cos(v) - y*Math.sin(v);
  });
}



function from3Dto2d(coord3d){

  let cube2D = [];

  coord3d.forEach((ball, coord3d) => {

    let x = ball.x - xPlane;
    let y = ball.y - yPlane;
    let z = ball.z;

    cube2D.push({
      x: xPlane + x/(eyeDistance + z) * z,
      y: yPlane + y/(eyeDistance + z) * z
    });
  });

  return cube2D;
}



/*--------------BALL--------------*/

function paintAllBalls(){
  ctx.clearRect(0,0,w,h);
  from3Dto2d(cube3D).forEach((ball, cube2D) => {
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
