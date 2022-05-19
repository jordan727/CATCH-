// CATCH!
// Turn project catch game, add roll system
// Falling object, user catches falling objects moving left and right, shift key makes user move faster
// Gacha characters have special abilities after catching a certain amount of fruits
// Every fruit = 10 gems, 160 for roll
// If time, add user scores on side, save user scores
// Show accuracy + score
// Health bar
// Space bar boost leaves trail
// Set Canvas Size
canvasSize(700, 800);

// Player Object
let player = {
  x: 300,
  y: 650,
  w: 100,
  h: 5,
  speed: 10
}

// Blocks
let blocks = initBlocks(50);

// Main Draw Loop
window.addEventListener("load", draw);

function draw() {
  // LOGIC
  movePlayer();
  catchBlocks();

  // DRAW
  background();
  drawPlayer();
  drawBlocks();

  requestAnimationFrame(draw);
}

// Helper Functions
function background() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}

function drawPlayer() {
  ctx.strokeStyle = "white";
  ctx.strokeRect(player.x, player.y, player.w, player.h);
}

function movePlayer() {
  if (keyPressed["Space"]) {
    player.speed = 20;
  } else {
    player.speed = 10;
  }

  if (keyPressed["KeyA"]) {
    player.x += -player.speed;
  } 
  if (keyPressed["KeyD"]) {
    player.x += player.speed;
  }
}

// Initialize an array with n random blocks
function initBlocks(n) {
  let temp = [];
  for (let num = 1; num <=n; num++) {
    temp.push(newRandomBlock());
  }
  return temp;
}

// Return a random block
function newRandomBlock() {
  return {
    x: Math.random() * cnv.width,
    y: 0,
    w: 15,
    h: 15
  }
}

// Draw all the blocks
function drawBlocks() {
  ctx.fillStyle = "green";
  for (let i = 0; i < blocks.length; i++) {
    drawBlock(blocks[i]);
  }
}

// Draw a single block
function drawBlock(block) {
  ctx.fillRect(block.x, block.y, block.w, block.h);
}

// Check if player ate any blocks
function catchBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    if (rectCollide(player, blocks[i])) {
      blocks.splice(i, 1);
      break;
    }
  }
}