const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

let viewX = windowWidth/2;
let viewY = windowHeight/2;
const viewpointDistance = 1;

function to2dCircle(coord3d, radie) {
  if(coord3d[2] > viewpointDistance){

    let x1 = (viewpointDistance * (windowWidth/2 - coord3d[0])) / coord3d[2];
    let y1 = (viewpointDistance * (windowHeight/2 - coord3d[1])) / coord3d[2];
    let r1 = (viewpointDistance * (windowHeight/2 - (coord3d[1] + radie))) / coord3d[2];

    let coord2d = [
      windowWidth/2 - x1,
      windowHeight/2 - y1,
      Math.abs(r1 - y1)
    ];

    return coord2d; //X, Y, r
  }else{
    var empty = [0,0,0];
    return empty;
  }
}
