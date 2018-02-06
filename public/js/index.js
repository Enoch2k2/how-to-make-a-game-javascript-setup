// global variables
var canvas, ctx, player;
const animate = window.requestAnimationFrame;
const WIDTH = 800;
const HEIGHT = 600;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;

window.addEventListener('load', function(){
    setup();
    animate(draw);
})

function setup(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    player = new Player(WIDTH / 2, HEIGHT / 2, 25, 25, 'red'); // creates a new player
    playerControls(); // adds the player controls;
}

function draw(){
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    player.draw();
    animate(draw);
}

class Player {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    // will draw to canvas
    draw(){
        ctx.fillStyle = `${this.color}`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function playerControls(){
    document.addEventListener('keydown', function(e){
        var key = e.which;
        if(key === RIGHT_ARROW){
            if(player.x < WIDTH - player.width) {
                player.x += 25;
            }
        } else if(key === LEFT_ARROW){
            if(player.x > 0) {
                player.x -= 25;
            }
        } else if(key === DOWN_ARROW){
            if(player.y < HEIGHT - player.height) {
                player.y += 25;
            }
        } else if(key === UP_ARROW){
            if(player.y > 0) {
                player.y -= 25;
            }
        }
    })
}