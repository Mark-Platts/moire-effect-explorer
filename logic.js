

const boxSize = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
const boxFactor = 0.9;


class Canvas {
    constructor(home, width, height, background = '#ffffee') {
        //basic arguments for the canvas
        this.home = home;
        this.canvasName = home+'Canvas';
        this.width = width;
        this.height = height;
        this.background = background;
        //locates the div to put the canvas in, creates the canvas, puts it in the div, saves the canvas variables for later use
        const target = document.getElementById(this.home);
        const arrow = `<canvas id=${this.canvasName} width=${this.width} height=${this.height}  style="background-color:${this.background}; border: 4px solid black;"></canvas>`
        target.innerHTML = arrow;
        this.canvas = document.getElementById(this.canvasName);
        this.ctx = this.canvas.getContext("2d");
        //saved for later
        this.clickHandler = this.canvas.addEventListener('click', (event) => { //used an arrow function here to get around 'this.' issues
            console.log('click!');
        })
        this.dragHandler = this.canvas.addEventListener('drag', (event) => { //used an arrow function here to get around 'this.' issues
            console.log('drag!');
        })
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    rotatePoint(point, rot) {
        return [point[0]*Math.cos(rot) - point[1]*Math.sin(rot), point[0]*Math.sin(rot) + point[1]*Math.cos(rot)];
    }
    fillWithCircles(size, sizeFactor, rot) {
        const xCen = this.width/2;
        const yCen = this.height/2;
        const canvasRad = ((this.width/2)**2 + (this.height/2)**2)**0.5;
        const intervalAmount = Math.round(canvasRad/size);
        for (let i = -intervalAmount; i < intervalAmount; i++) {
            for (let j = -intervalAmount; j < intervalAmount; j++) {
                const point = this.rotatePoint([i*size, j*size], rot);
                this.ctx.beginPath();
                this.ctx.fillStyle = '#111111';
                this.ctx.arc(point[0] + xCen, point[1] + yCen, size*sizeFactor/2, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    }
    fillWithSquares(size, sizeFactor, rot) {
        const length = size*sizeFactor;
        const cL = length/2;
        const vertices = [[-cL, -cL], [-cL, cL], [cL, cL], [cL, -cL]];
        const newVerts = [this.rotatePoint(vertices[0], rot), this.rotatePoint(vertices[1], rot), this.rotatePoint(vertices[2], rot), this.rotatePoint(vertices[3], rot)];
        const xCen = this.width/2;
        const yCen = this.height/2;
        const canvasRad = ((this.width/2)**2 + (this.height/2)**2)**0.5;
        const intervalAmount = Math.round(canvasRad/size);
        for (let i = -intervalAmount; i < intervalAmount; i++) {
            for (let j = -intervalAmount; j < intervalAmount; j++) {
                const point = this.rotatePoint([i*size, j*size], rot);
                this.ctx.beginPath();
                this.ctx.fillStyle = '#111111';
                this.ctx.moveTo(point[0] + newVerts[0][0] + xCen, point[1] + newVerts[0][1] + yCen);
                this.ctx.lineTo(point[0] + newVerts[1][0] + xCen, point[1] + newVerts[1][1] + yCen);
                this.ctx.lineTo(point[0] + newVerts[2][0] + xCen, point[1] + newVerts[2][1] + yCen);
                this.ctx.lineTo(point[0] + newVerts[3][0] + xCen, point[1] + newVerts[3][1] + yCen);
                this.ctx.fill();
            }
        }
    }
    renderComponents() {
        for (let i in this.components) {
            this.components[i].render(this.ctx, this.extraInfo);
        }
        for (let i in this.clickables) {
            this.clickables[i].render(this.ctx, this.extraInfo);
        }
        for (let i in this.decorators) {
            this.decorators[i].render(this.ctx, this.extraInfo);
        }
    }
}

