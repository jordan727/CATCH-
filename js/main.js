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
// Add abiltes (gold rush(all gold blocks for time), explode(blow up all blocks and get points for them), slow blocks)
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
let blocks = [];
setInterval(addBlock, 500);

let points = 0;
let combo = 0;
let n = 0;
// Main Draw Loop
window.addEventListener("load", draw);

function draw() {
  // LOGIC
  moveBlocks();
  movePlayer();
  catchBlocks();
  destroyBlock();

  // DRAW
  background();
  drawPlayer();
  drawBlocks();
  drawCombo();

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

function moveBlocks() {
  for (let i = 0; i < blocks.length; i++) {
  blocks[i].y += blocks[i].speed;
  }
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
  n++
  if (r > 9) {
    return {
      x: Math.random() * cnv.width,
      y: -40,
      w: 30,
      h: 30,
      color: "gold",
      speed: 4,
      n: n,
      points: 600
    }
  } else {
    return {
      x: Math.random() * cnv.width,
      y: -40,
      w: 30,
      h: 30,
      color: "red",
      speed: 4,
      n: n,
      points: 300
    }
  }
}

function drawCombo() {
  text()
}

// Draw all the blocks
function drawBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    ctx.fillStyle = blocks[i].color;
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
      points += blocks[i].points;
      blocks.splice(i, 1);
      // add combo checker with number assigned to each block
      break;
    }
  }
}

function destroyBlock(aBlock) {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].y > cnv.height) {
      blocks.splice(i, 1);
    }
  }
}