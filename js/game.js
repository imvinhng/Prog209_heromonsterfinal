// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 571;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image(1000,571);
bgImage.onload = function () {
	bgReady = true;
};
images = ["images/world-map-max.jpg","images/usmap2.jpg","images/map3.jpg","images/map4.jpg","images/map5.jpg","images/map10.jpg","images/world-map-2.jpg","images/world-political-map-new.jpg"];

bgImage.src = images[0];
let i = 1 ;
document.addEventListener("DOMContentLoaded", function (event) {
		document.getElementById('toggle').addEventListener('click', function(){
			bgImage.src = images[i++];
			console.log(i);
			if (i== images.length) {
				i=0;
			}
							
		});

		document.getElementById('hero').addEventListener('click', function(){
			heroImage.src = sprite[0]	
			hero.speed = "800";
		});

		document.getElementById('monster').addEventListener('click', function(){
			heroImage.src = sprite[1]	
			hero.speed = "500";		
		});

		
		document.getElementById('flash').addEventListener('click', function(){
			heroImage.src = sprite[2];
			hero.speed = "1000";
		});

		
		document.getElementById('pixilart').addEventListener('click', function(){
			heroImage.src = sprite[3];
			hero.speed = "300";			
		});


});

sprite = ["images/sprites/hero.png","images/sprites/monster.png","images/sprites/flash.png","images/sprites/pixilart.png"];
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/sprites/flash.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/sprites/monster.png";

// Game objects
var hero = {
	speed: 800 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	//putting sprites back into the mao
	if (hero.x > canvas.width) {
		hero.x = hero.x - canvas.width;
	} 
	if (hero.x < 0) {
		hero.x = canvas.width + hero.x;
	}
	if (hero.y > canvas.height) {
		hero.y = hero.y - canvas.height;
	}
	if (hero.y < 0) {
		hero.y = canvas.height - hero.y;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
