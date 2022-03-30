const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const btnNewYork = document.getElementById('new-york');
const btnColony = document.getElementById('colony')
const btnSun = document.getElementById('sun')
const btnElysium = document.getElementById('elysium')
const btnPluto = document.getElementById('pluto')

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


var colors = []

var gravity;
var friction;
// EArth
btnNewYork.addEventListener('click', function() {
    document.body.style.backgroundImage = "url('/img/220731.jpg')"
    gravity = .98;
    friction = .98

    colors = 
        ['#A6A6A6', 
        '#737373', 
        '#404040', 
        '#262626',
        '#0D0D0D']

});

// Mars
btnElysium.addEventListener('click', function() {
    document.body.style.backgroundImage = "url('/img/mars.jpg')"
    gravity = .37
    friction = .98

    colors = 
        ['#F2CF63', 
        '#F27127', 
        '#DA4916', 
        '#590E07',
        '#260606']

});

// 3 G worlds
btnColony.addEventListener('click', function() {
    document.body.style.backgroundImage = "url('/img/colony.jpg')"
    gravity = 2.94
    friction = .98

    colors = 
        ['#000000', 
        '#1A2903', 
        '#855402', 
        '#040238',
        '#610616']

});
// Pluto
btnPluto.addEventListener('click', function() {
    document.body.style.backgroundImage = "url('/img/pluto.jpeg')"
    gravity = .06
    friction = .98

    colors = 
        ['#2F1B0E', 
        '#F1C8A5', 
        '#715643', 
        '#DAB194',
        '#A48771']

});

// Sun
btnSun.addEventListener('click', function() {
    document.body.style.backgroundImage = "url('/img/sun2.jpg')"
    gravity = 27.4
    friction = .98

    colors = 
        ['#FFD041', 
        '#FFAE53', 
        '#3182E8', 
        '#5646E8',
        '#FFF509']

});

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init();
})

addEventListener("click", function() {
    init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}
  
// function distance(x1, y1, x2, y2) {
//     const xDist = x2 - x1
//     const yDist = y2 - y1

//     return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
// }

  


// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function() {
        // Make sure ball reverses everytime it hits the screen
        if(this.y + this.radius + this.dy > canvas.height) {
            // Friction; resistence applied by ground
            this.dy = -this.dy;
            this.dy = this.dy * friction;
            this.dx = this.dx * friction;
        } else {
            // gravity; create acceleration by adding gravity on to current valacity
            this.dy += gravity;
        }

        if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx * friction;
        }

        

        // Add velocity of 1 on to y value
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke();
        c.closePath()

   
    };
}

// Implementation
var ballArray;
function init() {
    // reset ball aray so don't have compounding balls
        ballArray = [];

    for(var i = 0; i < 600; i++) {
        // change size of balls
        var radius = randomIntFromRange(8, 20);
        var x = randomIntFromRange(radius, canvas.width - radius);
        // subtracting radius prevents balls from getting caught on bottom of page
        var y = randomIntFromRange(0, canvas.height - radius)
        var dx = randomIntFromRange(-3, 3);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor(colors);
            ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
    console.log(ballArray)
   
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

    // Must clear before drawing new balls
  c.clearRect(0, 0, canvas.width, canvas.height)

  for (var i = 0; i < ballArray.length; i++) {
    //   access each ball
      ballArray[i].update();
  }


 
}

init()
animate()




// Objects
// class Ball {
//   constructor(x, y, radius, color) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//   }

//   draw() {
//     c.beginPath()
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//     c.fillStyle = this.color
//     c.fill()
//     c.closePath()
//   }

//   update() {
//     this.draw()
//   }
// }

 // substantiate ball; give width and height
//  ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
  