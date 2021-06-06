class Planet{
    constructor(name, color, radie, x, y, z){
        this.name = name;
        this.radie = radie;
        this.color = color;
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
        
        let coord3d = [];
        coord3d.push({
            x:this.x,
            y: this.y,
            z: this.z
        });
        let coord2d = to2d(coord3d, this.radie);

        ctx.arc(this.x, this.y , this.radie, 0, 2*Math.PI);
        ctx.fill();
    }
}