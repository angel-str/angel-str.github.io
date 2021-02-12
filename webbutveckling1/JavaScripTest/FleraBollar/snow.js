//Olika stora snöflingor, hastighet på snön baserat på storlek
//Vindar, cos(v)
console.log("test");

var canvas =document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var h = window.innerHeight;
var w = window.innerWidth;
canvas.width = w;
canvas.height = h;

var amountSnow = 1000;
var snow = [];
var counter = 0;



for (var i = 0; i < amountSnow; i++) {

  var r1 = Math.random()*3+1;

  snow.push({
    r: r1,
    x: Math.floor(Math.random()*w),
    y: Math.floor(Math.random()*h),
    xv: 3,
    yv: r1 * 1});
}



function update(){
  var rad = toRadians(counter);

  snow.forEach((snowPartical, snow) => {

    if(snowPartical.x>w){
      snowPartical.x=0;
    }
    if(snowPartical.x<0){
      snowPartical.x = w;
    }
    if(snowPartical.y>h){
      snowPartical.y=0;
    }
    if(snowPartical.y<0){
      snowPartical.y = h;
    }

    snowPartical.x=snowPartical.x + snowPartical.xv*Math.cos(rad);
    snowPartical.y=snowPartical.y + snowPartical.yv;


  });

  counter+=0.0004;
}
function toRadians(degree){
  return degree * (180/Math.PI);
}


function paint(){
  ctx.clearRect(0,0,w,h);

  for (var i = 0; i < amountSnow; i++) {

    var snowPartical= snow[i];  // plockar ut en array ur arrayen
    ctx.fillStyle="rgb(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(snowPartical.x, snowPartical.y ,snowPartical.r, 0, 2*Math.PI); // x,y,r,startvinkel i radianer,slutvinkel i radianer
    ctx.fill();
  }
  update();
}
setInterval(paint, 30);
