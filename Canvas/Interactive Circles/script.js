const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d')
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
// var minRadius = 2;

// Specify hexidecimal colors
var colorArray = [
    '#5BBA6F',
    '#3FA34D',
    '#2A9134',
    '#137547',
    '#054A29'
]


function mouseMovement(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse)
}

// Resize canvas everytime browser resizes
function resizeBrowser() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize so the circles generate dynamically upon resize, rather than slowly making their way to fill new white space
    init();
}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx; 
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
      // Math.floor gets lowest whole number
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    

    this.draw = function() {
       
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill();
       
    }

    this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
        
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
       
    }
   
    this.x += this.dx;
    this.y += this.dy;

    // interactivity

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < maxRadius) {
            this.radius+= 1; 
        }
    } else if (this.radius > this.minRadius){
        // circles will shrink down to original radius size > creates variety in circle size when shrunk
        this.radius -= 1;
    }

    this.draw();
    }
}

var circleArray = [];

// Resetting circle array upon resize, generate in new positions so fill entire screen
function init() {

    // prevents new circles from generating everytime and overlapping old ones which leads to lag
    circleArray = [];
    for (var i = 0; i < 800; i++) {
    // Get range of 1-4 instead of 0-4 by adding one after multiplying
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
    
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
   
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
  
}

init();
animate();

window.addEventListener('mousemove', mouseMovement);
window.addEventListener('resize', resizeBrowser);