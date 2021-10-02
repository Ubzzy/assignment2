var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 813;
canvas.height = 521;
document.body.appendChild(canvas);
var score_element=document.getElementById("bugsSmashed")

var x;
var y;

var hero_speed=1000;
var timer;

var game_over =5000
var time_limit = game_over
var numerical_decrement = 500
var check_first_time=true;

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.jpg";

var bugReady = false;
var isCollision = false
var bugImage = new Image();
var bugLocation;
bugImage.onload = function () {
	bugReady = true;
};
bugImage.src = "images/bug.png";

var hero = {
	w:35,
	h:35,
	speed: 256
};
var bug = {
	w:100,
	h:100
};
var bugsCaught = 0;

canvas.addEventListener("mousemove", function(event) {
	var click_position = click_coords(canvas, event);
	hero.x=click_position.x
	hero.y=click_position.y
  }, false);

canvas.addEventListener("click", function(event) 
{
	if (
		hero.x <= (bug.x + 32)
		&& bug.x <= (hero.x + 32)
		&& hero.y <= (bug.y + 32)
		&& bug.y <= (hero.y + 32)
	) 
	{
		kill()
	}
});
 
function click_coords(canvas, event) {
		  var eje = canvas.getBoundingClientRect();
		  return {
		    x: Math.round(event.clientX - eje.left),
		    y: Math.round(event.clientY - eje.top)
		  }
		}
function kill(){

		clearInterval(timer);
		++bugsCaught;

		score_element.innerHTML=bugsCaught;
		game_over-=numerical_decrement
		if(game_over==0)
		{
			clearInterval(timer);
			alert("win");
			reset_score()
			reset_speed()
			reset()
		}
		else
		{
			timer =	setInterval(() => {
				reset()
			}, game_over);
			reset()
		}
		
}
function reset_speed()
{
	clearInterval(timer);
	game_over = time_limit
	timer =	setInterval(()=>{
		reset()
	}, game_over);
}
function reset_score()
{
	bugsCaught=0;
	score_element.innerHTML=bugsCaught;
	reset_speed()
}
var reset = function (event) {

	bug.x = 32 + (Math.random() * (canvas.width - 64));
	bug.y = 32 + (Math.random() * (canvas.height - 64));
	isCollision=false;
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (bugReady) {
		ctx.drawImage(bugImage, bug.x-(bug.h/2), bug.y-(bug.w/2),bug.w,bug.h);
	}
};

var main = function () {
	render();
	requestAnimationFrame(main)
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

timer =	setInterval(() => {
		reset()
	}, game_over);
reset();
main();
