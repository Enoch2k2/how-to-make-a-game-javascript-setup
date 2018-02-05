// global variables
var canvas, ctx;
const WIDTH = 800;
const HEIGHT = 600;

window.addEventListener('load', function(){
    setup();
})

function setup(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}