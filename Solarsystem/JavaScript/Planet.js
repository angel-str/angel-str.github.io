class Planet{
    constructor(name, color, radie, x, y, z){
        this.name = name;
        this.color = color;
        this.radie = radie
        this.x = x;
        this.y = y;
        this.z = z;
    }
    sayHi() {
        console.log(this.name);
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let coord3d = [this.x, this.y, this.z];

        console.log(coord3d);

        let coord2d = to2dCircle(coord3d, this.radie);

        console.log(coord2d);

        ctx.arc(coord2d[0], coord2d[1] , coord2d[2], 0, 2*Math.PI);
        ctx.fill();
    }
}
