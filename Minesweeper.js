var cellSize = 20;
var grid;
var bombCount = 20;
var mineSlider;
var restartButton;

function setup() {
  createCanvas(500, 400);
  reset();
  mineSlider = createSlider(20, 80, bombCount, 10);
  mineSlider.position(400, 50);
  mineSlider.style('width', '90px');
  restartButton = new resetButton();
  rend();
}

function draw() {
  
}

function rend(){
  background(0);
  showGrid();
  showUI();
}

function reset(){
  makeGrid();
  placeBombs();
}

function mouseDragged() {
  rend();
}

function mousePressed() {
  let mX = mouseX;
  let mY = mouseY;
  if (mX > 0 && mX < cellSize * 20 && mY > 0 && mY < cellSize * 20) {
    let x = Math.floor(mouseX / cellSize);
    let y = Math.floor(mouseY / cellSize);
    grid[x][y].click();
  } else {
    restartButton.clickCheck(mX, mY);
  }
  rend();
}

function makeGrid() {
  grid = new Array(20);
  for (let i = 0; i < 20; i++) {
    grid[i] = new Array(20);
  }

  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      grid[x][y] = new Cell(x, y);
    }
  }
}

function showGrid() {
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      grid[x][y].show();
    }
  }
}

function placeBombs()
{
  for (let i = 0; i < bombCount; i++)
  {
    //let cell = grid[Math.floor(random(20))][Math.floor(random(20))];
    do  {
      cell = grid[Math.floor(random(20))][Math.floor(random(20))];
    }
    while (cell.hasMine);
    cell.hasMine = true;
  }
}

function showUI(){
  restartButton.show();
  bombCount = mineSlider.value();
  noStroke();
  fill(0);
  rect(420, 10, 30, 20);
  fill(255);
  text(bombCount, 420, 30);
  
}

var resetButton = function(){
  this.x = 410;
  this.y = 80;
  this.w = 80;
  this.h = 30;
  
  this.show = function(){
    fill(200);
    stroke(80);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    noStroke();
    text("Reset", this.x + this.w * 0.3, this.y + this.h -12);
  }
  
  this.clickCheck = function(x, y) {
    if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h)
    {
      reset();
    }
  }
}
