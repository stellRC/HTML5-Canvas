const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creating super object within c that we can use to draw objects, ie. magic paint brushto draw 2d objects
var c = canvas.getContext('2d')

// Start with capital letter so you know you are creating an object

var colorArray = [
    '#E6C229',
    '#F17105',
    '#D11149',
    '#6610F2',
    '#1A8FE3'
]

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx; 
    this.dy = dy;
    this.radius = radius;
    // Prevents fillStyle from happening everytime a new circle is created
    this.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
       
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'white';
        c.fillStyle = this.fillStyle
        c.fill();
       
    }

    this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
    }
    // x vilocity
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
    }
}

var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = 30;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    // can move in both directions (positive and negative, Math.random only gives positive numbers)
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
   
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
   
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
  
}

animate();





// Reference Code

// create box
// (x, y, width, height)
// Change fill styles of each by putting new fill style directly above
    // c.fillStyle = 'rgba(255, 0, 0, .5)'
    // c.fillRect(100, 100, 100, 100)
    // c.fillStyle = 'rgba(0, 255, 0, .5)'
    // c.fillRect(400, 100, 100, 100)
    // c.fillStyle = 'rgba(0, 0, 255, .5)'
    // c.fillRect(300, 300, 100, 100)

// Lines

    // c.beginPath();
    // c.moveTo(50, 300);
    // c.lineTo(300, 100);
    // c.lineTo(400, 300)
    // c.strokeStyle = "#fa34a3";
    // c.stroke();


// Create Arc/ Circle

    // always want to start with beginPath so you can prevent lines from connecting to eachother 
    // c.beginPath();
    // c.arc(300, 300, 30, 0, Math.PI * 2, false)
    // c.strokeStyle = 'blue';
    // c.stroke();

// create multiple circles using a for loop

// for (var i = 0; i < 3; i++) {
//     // Draw random elements
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false)
//     c.strokeStyle = 'blue';
//     c.stroke();

// }

// this.draw function() {
    // Random Colors
    // c.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';
// }

