const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameStarted = false;

let doraemon = {
x: 80,
y: 200,
width: 60,
height: 60,
gravity: 0.35,
lift: -7,
velocity: 0
};

let obstacles = [];
let score = 0;

let doraemonImg = new Image();
doraemonImg.src = "assets/doraemon.png";

document.addEventListener("keydown", function(e){

if(e.code === "Space"){

if(!gameStarted){
gameStarted = true;
}

doraemon.velocity = doraemon.lift;

}

});

function createObstacle(){

let gap = 300;   // BIGGER GAP

let topHeight = Math.random() * 200;

obstacles.push({
x: canvas.width,
top: topHeight,
bottom: topHeight + gap,
width: 80
});

}

function drawStartScreen(){

ctx.fillStyle = "#87CEEB";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = "black";
ctx.font = "30px Arial";
ctx.fillText("Doraemon Copter",110,250);

ctx.font = "20px Arial";
ctx.fillText("Press SPACE to Start",110,300);

}

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height);

if(!gameStarted){

drawStartScreen();

requestAnimationFrame(update);

return;

}

doraemon.velocity += doraemon.gravity;
doraemon.y += doraemon.velocity;

if(doraemon.y < 0){
doraemon.y = 0;
}

if(doraemon.y + doraemon.height > canvas.height){

alert("Game Over! Score: " + score);

location.reload();

}

ctx.drawImage(
doraemonImg,
doraemon.x,
doraemon.y,
doraemon.width,
doraemon.height
);

if(Math.random() < 0.015){
createObstacle();
}

obstacles.forEach(obs => {

obs.x -= 2;

ctx.fillStyle = "#444";

ctx.fillRect(obs.x,0,obs.width,obs.top);

ctx.fillRect(obs.x,obs.bottom,obs.width,canvas.height);

if(
doraemon.x < obs.x + obs.width &&
doraemon.x + doraemon.width > obs.x &&
(doraemon.y < obs.top || doraemon.y + doraemon.height > obs.bottom)
){

alert("Game Over! Score: " + score);

location.reload();

}

if(obs.x + obs.width === doraemon.x){

score++;

}

});

ctx.fillStyle = "black";
ctx.font = "22px Arial";
ctx.fillText("Score: " + score,20,40);

requestAnimationFrame(update);

}

update();