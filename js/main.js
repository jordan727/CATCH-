// CATCH!
// Turn project catch game, add roll system
// Falling object, user catches falling objects moving left and right, shift key makes user move faster
// Gacha characters have special abilities after catching a certain amount of fruits
// Every fruit = 10 gems, 160 for roll
// every 10 pulls garunteed purple
//  90 gold lol
// If time, add user scores on side, save user scores
// Show accuracy + score
// Health bar
// Space bar boost leaves trail
// Add combo counter
// Add abiltes (gold rush(all gold blocks for time), explode(blow up all blocks and get points for them), slow blocks, 2x points, giant player)
// Control Editor

// Turn blocks into fruit
// Add pixel graphics

// Set Canvas Size
canvasSize(700, 800);

// Player Object
let player = {
  x: 300,
  y: 690,
  w: 100,
  h: 25,
  speed: 10,
  img: "img/burd.jpg"
}

image("img/burd.jpg", player.x, player.y, player.w, player.h);

let blockInterval = null;
// Blocks
let blocks = [];
let points = 0;
let started = false;
let combo = 0;
let highscore = 0;
let missed = 0;
// Main Draw Loop
text("Press Space to Start", 50, 150, "fill")
window.addEventListener("load", draw);
window.addEventListener("blur", pauseGame)

function draw() {
  if (started == true) {
    // LOGIC
    moveBlocks();
    movePlayer();
    catchBlocks();
    destroyBlock();
    pauseGame();
    highScore();
    lifeChecker();

    // DRAW
    background();
    drawPlayer();
    drawBlocks();
    drawText();
    
  } else if (started == false) {
    startGame()
  }
  requestAnimationFrame(draw);
}

function startGame() {
  if (keyPressed["Space"]) {
    started = true;
    blockInterval = setInterval(addBlock, 500);
  }
}

function countdown() {

}

function pauseGame() {
  if (started == true) {
    if (keyPressed["Escape"]) {
      started = false;
      clearInterval(blockInterval);
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, cnv.width, cnv.height);
      }
  }
}

function resetGame() {

}

function endGame() {
  started = false;
  clearInterval(blockInterval);
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}

function highScore() {
if (points > highscore) {
  highscore = points;
}
}

function lifeChecker() {
  if (missed == 3) {
    endGame()
  }
}

// Helper Functions
function background() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}

function drawPlayer() {
  ctx.strokeStyle = "white";
  // ctx.strokeRect(player.x, player.y, player.w, player.h);
  image("img/burd.jpg", player.x, player.y, player.w, player.h);
}

function moveBlocks() {
  for (let i = 0; i < blocks.length; i++) {
  blocks[i].y += blocks[i].speed;
  }
}

function powerUp() {

}

function movePlayer() {
  if (keyPressed["Space"]) {
    player.speed = 20;
  } else {
    player.speed = 10;
  }
  
  if (keyPressed["ArrowLeft"] || keyPressed["KeyA"]) {
    player.x -= player.speed;
  } else if (player.x > 600) {
    player.x = 600;
  }
  if (keyPressed["ArrowRight"] || keyPressed["KeyD"]) {
    player.x += player.speed;
  } else if (player.x < 0) {
    player.x = 0;
  }
}

// Initialize an array with n random blocks
// function initBlocks(n) {
//   let temp = [];
//   for (let num = 1; num <=n; num++) {
//     temp.push(newRandomBlock());
//   }
//   return temp;
// }

function addBlock() {
  blocks.push(newRandomBlock());
}

// Return a random block
function newRandomBlock() {
  r = randomDec(1, 10);
  if (r > 9.8) {
    return blockCreator("green", 0)
  } else if (r > 9) {
    return blockCreator("gold", 600)
  } else {
    return blockCreator("red", 300) 
  }
}

function blockCreator(color, points) {
  return {
    x: Math.random() * (cnv.width - 30),
    y: -40,
    w: 30,
    h: 30,
    color: color,
    speed: 10,
    points: points
  }
}

function drawText() {
  ctx.fillStyle = "white"
  if (combo > 0){
    text(combo + "x", 350, 100, "fill")
  }
  text("Score: " + points, 15, 30, "fill")
  text("Highscore: " + highscore, 15, 50, "fill")
}

// Draw all the blocks
function drawBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    drawBlock(blocks[i]);
  }
}

// Draw a single block
function drawBlock(block) {
  ctx.fillStyle = block.color;
  return ctx.fillRect(block.x, block.y, block.w, block.h);
}

// Check if player ate any blocks
function catchBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    if (rectCollide(player, blocks[i])) {
      points += blocks[i].points;
      combo++;
      blocks.splice(i, 1);
      break;
    }
  }
}

// Check if a block reaches the bottom of the canvas
function destroyBlock() {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].y > cnv.height) {
      blocks.splice(i, 1);
      combo = 0;
      missed++;
    }
  }
}