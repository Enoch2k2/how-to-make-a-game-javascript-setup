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