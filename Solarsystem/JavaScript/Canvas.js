const canvas = document.getElementById("canvas");
canvas.width = windowWidth;
canvas.height = windowHeight;

const ctx = canvas.getContext("2d");

//Name, color, radie, x, y, z
let planets = [
  new Planet("Mercury", "rgb(191, 179, 174, 1)", 1000, -60000, 200, 100),
  new Planet("Venus", "rgb(255, 215, 94, 1)", 5000, -50000, 200, 100),
  new Planet("Earth", "rgb(45, 204, 45, 1)", 16000, -40000, 200, 100),
  new Planet("Mars", "rgb(207, 135, 41, 1)", 4000, -30000, 200, 100),
  new Planet("Jupiter", "rgb(227, 208, 184, 1)", 10000, -15000, 200, 100),
  new Planet("Saturnus", "rgb(255, 221, 28, 1)", 8000, 0, 200, 100),
  new Planet("Uranus", "rgb(145, 237, 255, 1)", 7000, 10000, 200, 100),
  new Planet("Neptune", "rgb(0, 130, 156, 1)", 7000, 20000, 200, 100),
  new Planet("Pluto", "rgb(255, 255, 255, 1)", 5000, 30000, 200, 100)
];


function update() {
    rotate();
    draw();
}

function rotate() {

}

function draw() {
    ctx.clearRect(0,0,windowWidth,windowHeight);
    planets[0].draw(ctx);
    planets[1].draw(ctx);
    planets[2].draw(ctx);
    planets[3].draw(ctx);
    planets[4].draw(ctx);
    planets[5].draw(ctx);
    planets[6].draw(ctx);
    planets[7].draw(ctx);
    planets[8].draw(ctx);
}




update();
