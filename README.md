# How to setup a simple Javascript Game

### first steps
- run npm init in order to create a package.json which we will use in order to have our dependencies ***Will require node to be installed***

### filestructure
```
public
  - css
    - style.css
  - js
    - index.js
  - index.html
.gitignore
index.js
package.json
README.md
```

### installing dependancies
We will need to run our application on a server. We will be using node's express.js to do this. To get started we will need to run:
```
npm i --save express
```
This will add to our depencies in our `package.json`
```
{
  "name": "how-to-make-a-game-javascript-setup",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Enoch2k2/how-to-make-a-game-javascript-setup.git"
  },
  "author": "Enoch Griffith",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Enoch2k2/how-to-make-a-game-javascript-setup/issues"
  },
  "homepage": "https://github.com/Enoch2k2/how-to-make-a-game-javascript-setup#readme",
  "dependencies": {
    "express": "^4.16.2"
  }
}
```

### removing node_modules from our git commits
We want to make sure our users have freshly installed dependencies, therefore we want to make sure our node_modules folders aren't added to our git commits. To do that inside our `.gitignore` file we can simply add:
```
node_modules
```
This will tell git that we would not like to add our node_modules when we make our commits.

### creating an express server
Now that we have express.js installed, we need to create a server for our application to work on.

Inside the root directory of our project, we need to open the `index.js` (not the index.js in the /public/js/index.js). Once that's opened we need to require in our express.js.
```
const express = require("express");
```
This allows us access to express in this file. We now need to create our app controller. To do this we need to add:
```
const app = express();
```
Now that we have our app controller. We need to tell our app controller what directory we are going to use to read our files from. All of our application lives in our public directory, so we need to tell our app to `use` that:
```
app.use(express.static(__dirname + "/public/"));
```
Now that we have our directory up for the server to use, we need to set us a route, we will be using the `"/"` route or the root route to go to when our server starts. This is basically our homepage.

When we go to that route, we expect the response from going to the route to be our index.html page. So we need to server or `send` ourselves the index.html `file`.

To setup the route and send us the index.html we would add:
```
app.get("/", function(req, resp){
    resp.sendFile("index.html");
})
```
Now that we have our controller setup, our directory setup, and our first route and file being served to us. Now we need to add a port for our server to listen to. To do this we will add:
```
app.listen(3000, function(){
    console.log('listening on port: 3000');
})
```
When our server starts, we can then go to `localhost:3000`, and it will also display in the terminal `listening on port: 3000` to remind us what port we are using.

Now we just need a way to start our server. To do that we will need to open our `package.json`.

Inside the `package.json`, there should be a `test` script. Change `test` to `start` and inside the `""` that the `test` command is being set to, set it to `"node index.js"`. This is using node to run our `index.js` server.

Your scripts in `package.json` should now look like:
```
"scripts": {
    "start": "node index.js"
  },
```
Before we start our server, we need something to see in the browser. Navigate to `public/index.html` and open it up and lets add our html structure as well as an `<h1>Hello World!</h1>` to it or you can just copy / paste this template:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Simple HTML5 Express Game</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
```
Perfect, make sure everything is saved, and lets type in terminal `npm start` to run our server and go to `localhost:3000`. You should see `Hello World!` in the browser. Awesome we have our server correctly routed!

### setting up our canvas
Now the fun can begin! We now have our server setup, we can now create our canvas. Replace `<h1>Hello World!</h1>` with `<canvas height="600" width="800" />`.

Refresh the page and view the glory that is our canvas!! Wait, where is it? Wellll right now nothing is displaying in our canvas, but that will soon change. Lets go ahead and script in our `js/index.js`.
```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Simple HTML5 Express Game</title>
    <script src="js/index.js"></script>
</head>
```

### adding a background to the canvas
Since we are using standard javascript, we will need an event to happen as soon as everything loads. In our `js/index.js` we will add the following lines:
```
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
```
So the first thing we want to do, we want our canvas and our ctx to be pre-declared as a global variables so we can later define them with values when the page loads.

We also want to be able to reference with `WIDTH` and the `HEIGHT` of the canvas. So we know what range of view we are looking at.

We defined our `setup` function in order to say, this is the first thing that's going to happen, and this is what we want to happen on the first `tic` of our game. The game will run 60 frames a second. So you can think of setup being the setup for frame 1.

Then we add the `window.eventListener('load', callback)` where our callback is a function that calls `setup`. So as soon as the page loads up, our setup function will get called.

Our setup function adds the value for the `canvas` grabbing it out of the `DOM`. We then set our `ctx` to `canvas.getContext('2d')` saying that we will be working with a `2d` environment. We then say, what fill color we want to use. Which in this case is gray. And we fill a rectange in this format, `ctx.fillRect(x, y, width, height)`. `x` is our horizontal and starts at the left side. So `0` would be completely on the left of the canvas. `y` is our vertical, and starts at the `top` of the canvas. So `x: 0, y:0`, would be at the top corner. the width, is how wide we want our rectance, and the height is how big. So you can imagine the `x` being started at `0` and ending at `600`. And the `y` starting at `0` and ending at `800`.

If you refresh your page, you should see a square box!

### adding frames per second to your canvas for animation
So now that we have a canvas setup and ready to be drawn on. We need a way to make our canvas be able to change per frame. This allows our drawings to be able to move around the canvas or we can add effects to that canvas.

Lets update our code with a draw function:
```
function draw(){

}
```
This function is going to recursively call itself 60 times a second. To do this we will need `window.requestAnimationFrame`. Let's alias `window.requestAnimationFrame` as a global constant `animate` and make our draw function recursively call itself through the animate function.
```
// global variables
var canvas, ctx;
const animate = window.requestAnimationFrame;
```
```
function draw(){

  animate(draw); // draw gets called 60 times a second
}
```
Perfect! So how can we tell this is being called 60 times a second? Well right now it's not. We don't have an entry point where draw is being called. Lets animate our first frame in our `load` event listener.
```
window.addEventListener('load', function(){
    setup();
    animate(draw); // animates the first frame in our screen
})
```
So now our `draw` function is happening 60 times a second. How can we check this? Let's create a global variable called `count` and set it to `0`.
```
// global variables
var canvas, ctx;
const animate = window.requestAnimationFrame;
const WIDTH = 800;
const HEIGHT = 600;
let count = 0;
```
And inside our `draw` function, lets `console.log(++count)` so that we can see it increment in our chrome console.
```
function draw(){
    console.log(++count);
    animate(draw);
}
```
Refresh the browser and open your `chrome console`. You should see the count being rapidly incremented. Pretty cool right?

So what can we do from here? Well lets randomly create boxes in our screen just to see how this could work. Go ahead and delete the `count` variable we created, and also remove the `console.log(++count)` from your draw function. We will move `ctx.fillStyle = 'gray'` and `ctx.fillRect(0, 0, WIDTH, HEIGHT)` into our `draw` function so that our background is redrawn every frame.

The reason we would want our background redrawn every frame is that if you animate something on your canvas with the background drawn only once, then anything you animate on the background will still appear every frame, the background won't draw over what was previously animated.
```
function setup(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
}

function draw(){
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    animate(draw);
}
```
Next why don't we make a box in the canvas move with our keys?

### creating our player
As you can imagine our box will be our mighty player! So let's do a little bit of object oriented javascript in order to make our player. We will need to know about the position of our player, as well as his width, his height, and what color we want to make our player box.
```
class Player {
  constructor(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}
```
We now have our player defined, why don't we create our player in our setup, so our player will be available to us when the game starts? We will also need a global variable to contain our player so all of our functions will know who the player is.
```
// global variables
var canvas, ctx, player;
```
```
function setup(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    player = new Player(0, 0, 25, 25, 'red'); // creates a new player
}
```
Great! We now have a player in our game world. However we haven't yet drawn him to our canvas. Let's add two prototype functions to our player. We will add `draw` which will render the player to the canvas.
```
draw(){
        ctx.fillStyle = `${this.color}`; // tells the canvas what color we are about to use
        ctx.fillRect(this.x, this.y, this.width, this.height); // tells the canvas to create a rectangle
    }
```
Next we need to update our `draw()` function that is currently being animated so we can animate our player to the screen.
```
function draw(){
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    player.draw(); // gets drawn over the background
    animate(draw);
}
```
Refresh the page and you should see your player in the canvas!

### adding player controls
Having a player in the canvas is all good and all. But we want some functionality for that player. It would be nice if we used the arrow keys, and made that player move around!

To start out, lets create some global constants as helpers for the keys we will be using.
```
// global variables
var canvas, ctx, player;
const animate = window.requestAnimationFrame;
const WIDTH = 800;
const HEIGHT = 600;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
```
Next, lets create a function that will add an event listener for our keydown events.
```
function playerControls(){
    document.addEventListener('keydown', function(e){
  
    })
}
```
Next we need to get our key that we had pressed. Lets grab it and set it to a variable, `var key = e.which`.

Now for the fun part. We have our `canvas` which is our game view. We need to make sure our `player` doesn't leave our view, so we need some way to clamp it to the view. To do this we will need some conditions. Lets work on moving the player `right` first.

We know the the `WIDTH` of our canvas is `800`. The `width` of our player is `25`. So that means, if our player was at the right edge of our view, his `x` position would be at `775` or `WIDTH - player.width`. Let's write this condition and increment our player's x position by 25.
```
function playerControls(){
    document.addEventListener('keydown', function(e){
        var key = e.which;
        if(key === RIGHT_ARROW){
            if(player.x < WIDTH - player.width) {
                player.x += 25;
            }
        }
    })
}
```
In our `setup()` function we will go ahead and add our player controls. So we can test this out.
```
function setup(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    player = new Player(0, 0, 25, 25, 'red'); // creates a new player
    playerControls(); // adds the player controls;
}
```
Let's refresh the page and test it out.

Perfect, our `player` moves to the right and stops at the right end of the screen. Let's try moving left now!

So now when we think of clamping the player to the left of the game view so that it doesn't go off the screen. The left side of the view is `0`. So as long as the player's x position is greater than the `0` we would want to be able to move left. To move left we will need to decrement our player's x position by `25` so it's getting closer to the `0` position of the game view. Let's write this condition in our event handler.
```
function playerControls(){
    document.addEventListener('keydown', function(e){
        var key = e.which;
        if(key === RIGHT_ARROW){
            if(player.x < WIDTH - 25) {
                player.x += 25;
            }
        } else if(key === LEFT_ARROW){
            if(player.x > 0) {
                player.x -= 25;
            }
        }
    })
}
```
Refresh the page and test it out!

Perfect, we can now move to the left! Next we will work on the `down key`.

So for our player to move down in the game view without leaving the screen. We will need to check the players `y` position and the game `HEIGHT`. Our `y` position determines vertical position. The `HEIGHT` tells us the height of our view which we know is `600`. We know the `height` of our player is `25`. So if the player is at the bottom of the screen, the game view y position would be 575 or `HEIGTH - player.height`. So as long as the player's y position is less than `HEIGHT - player.height` we can move downward. Lets write this condition and increment our `player.y` by 25.
```
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
        }
    })
}
```
Let's refresh the page and test it out!

So now our player can move right, left, and down without leaving the screen. Next will we move the player up.

So when we think about keeping our player in the view while moving up, our `y` position in the game view is `0`. So as long as our players y position is greater then `0` then we would be able to move up. Let's write this condition and increment our players y position by `25`.
```
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
```
Great our player can now move in all directions!! Give yourself a pat on the back for a job well done. :)