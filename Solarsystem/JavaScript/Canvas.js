const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const canvas = document.getElementById("canvas");
canvas.width = windowWidth;
canvas.height = windowHeight;

const ctx = canvas.getContext("2d");

let pluto = new Planet("Pluto", "rgb(255, 255, 255, 1)", 50, 100,100,0);
let earth = new Planet("Earth", "rgb(37, 230, 210, 1)", 300, 500, 400, 4000);


function update() {
    rotate();
    draw();
}

function rotate() {
    
}

function draw() {
    ctx.clearRect(0,0,windowWidth,windowHeight);
    pluto.draw(ctx);
    earth.draw(ctx);
}




draw();