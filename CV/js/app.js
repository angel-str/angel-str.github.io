console.log("Connected");
var jsHide_var = document.getElementsByClassName("jsHide");
jsHide_var[0].style.display = "none";
jsHide_var[1].style.display = "none";

var jsShow_var = document.getElementsByClassName("jsShow");
jsShow_var[0].style.display = "block";
jsShow_var[1].style.display = "block";
jsShow_var[2].style.display = "block";
jsShow_var[3].style.display = "block";
jsShow_var[4].style.display = "inline";
jsShow_var[5].style.display = "inline";

document.getElementById("window").style.overflow = "hidden";
document.getElementById("slider").style.flexDirection = "row";

//KOLLA MED DANILE OM UPPE -----------------------------------------------------


/*NAV*/
var hamBtn = document.getElementById("listSvg");
var nav = document.getElementsByTagName("nav")[0];
var trackerNav = true;
nav.style.transition = "0.5s ease-in-out";
hamBtn.addEventListener("click",navSlide);
function navSlide(){
  if(trackerNav){
    nav.style.transform = "translateX(0%)";
    trackerNav = false;
  }else{
    nav.style.transform = "translateX(100%)";
    trackerNav = true;
  }
}


/*Slider*/
var counterSlider = 1;
var currentValueNav = 0;
const amountOfSlides = 2;
document.getElementById("leftBtn").addEventListener("click", leftNav);
document.getElementById("rightBtn").addEventListener("click", rightNav);
var slider = document.getElementById("slider");

function leftNav(){
  currentValueNav += 500;
  slider.style.transform = "translateX(" + currentValueNav +"px)";
  counterSlider--;
  if(counterSlider == 0){
    currentValueNav -= 500 * amountOfSlides;
  slider.style.transform = "translateX(" + currentValueNav +"px)";
  counterSlider = amountOfSlides;
  }
}
function rightNav(){
  currentValueNav -= 500;
  slider.style.transform = "translateX(" + currentValueNav +"px)";
  counterSlider++;
  if(counterSlider == amountOfSlides + 1){
    currentValueNav = 0;
  slider.style.transform = "translateX(" + currentValueNav +"px)";
  counterSlider = 1;
  }
}

/*Slider 2*/
var radioBtns = document.getElementsByClassName("radioBtn");
var parOrder = document.getElementsByClassName("pOrder")
radioBtns[0].addEventListener("click", slide0);
radioBtns[1].addEventListener("click", slide1);
radioBtns[2].addEventListener("click", slide2);
parOrder[0].style.opacity = "100%";
parOrder[1].style.opacity = "0%";
parOrder[2].style.opacity = "0%";
parOrder[0].classList.add("paragrafJS");
parOrder[1].classList.add("paragrafJS");
parOrder[2].classList.add("paragrafJS");


function slide0(){
  document.getElementById("AndoridJones").style.transform = "translateX(0px)";

  parOrder[0].style.opacity = "100%";
  parOrder[1].style.opacity = "0%";
  parOrder[2].style.opacity = "0%";
}
function slide1(){
  document.getElementById("AndoridJones").style.transform = "translateX(-500px)";
  parOrder[0].style.opacity = "0%";
  parOrder[1].style.opacity = "100%";
  parOrder[2].style.opacity = "0%";
}
function slide2(){
  document.getElementById("AndoridJones").style.transform = "translateX(-1000px)";
  parOrder[0].style.opacity = "0%";
  parOrder[1].style.opacity = "0%";
  parOrder[2].style.opacity = "100%";
}

/*KUB*/


/*--------------VARIABLES--------------*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;

const updFre = 10;

const scaler = 1.8;

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

const v = 0.5 * (Math.PI/180);
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
