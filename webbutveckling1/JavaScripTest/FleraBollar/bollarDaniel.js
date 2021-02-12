console.log("test");

var canvas =document.getElementById("canvas");

var ctx = canvas.getContext("2d");
var h=window.innerHeight;
var w=window.innerWidth;
canvas.width=w;
canvas.height=h;

var antalbollar=10;
var bollar =[];  // skapar arr   (radie , hastighet , färg, x , y)

for (var i = 0; i < antalbollar; i++) {

  bollar.push({
    r: Math.random()*100,
    x: Math.floor(Math.random()*w),
    y: Math.floor(Math.random()*h/2),
    c1: Math.random()*255,
    c2: Math.random()*255,
    c3: Math.random()*255,
    xv: Math.random()*(30-20)+20,
    yv: Math.random()*(4-2)+2,
    g: 5});

    var rand=Math.floor(Math.random()*2);
    //console.log(bollar[i].xv);

    if(rand==1){
      bollar[i].xv=bollar[i].xv*-1;
      console.log(rand);
    }
  }






  function update(){

    bollar.forEach((boll, bollar) => {

        if(boll.y>h-boll.r){
          if(boll.yv>-1 && boll.yv<1){
            boll.y=h-boll.r;
            boll.g=0;
            boll.yv=0;
            console.log("Stannat");
          }
          boll.yv=boll.yv*-1;
          boll.y=h-boll.r;
        }

        boll.yv=boll.yv+boll.g;
        boll.y=boll.y+boll.yv;

        boll.xv = boll.xv * 0.993;
        boll.x=boll.x+boll.xv;

        if(boll.x>w-boll.r){
          boll.xv=boll.xv*-1;
          boll.x=w-boll.r;
        }if(boll.x<boll.r){
          boll.xv=boll.xv*-1;
          boll.x=boll.r;
        }
    });
  }
  function paint(){
    ctx.clearRect(0,0,w,h);

    for (var i = 0; i < antalbollar; i++) {

      var boll= bollar[i];  // plockar ut en array ur arrayen

      ctx.fillStyle="rgb("+boll.c1+","+boll.c2+","+boll.c3+", 0.8)";
      ctx.beginPath();
      ctx.arc(boll.x, boll.y  ,boll.r,0,2*Math.PI); // x,y,r,startvinkel i radianer,slutvinkel i radianer
      ctx.lineWidth=10;
      ctx.fill();
    }
    update();
  }


  setInterval(paint,30);
