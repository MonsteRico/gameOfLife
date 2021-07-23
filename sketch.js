var grid;
// 16x16 grid on a 400x400 canvas
var frame = 0;
var slider;
var simulationStarted = false;
var button;
function setup() {
  createCanvas(400, 400);
  grid = [];
  for (var r = 0; r < 32; r++) {
    let row = [];
    for (var c = 0; c < 32; c++) {
      row.push(new Cell('dead',r,c));
    }
    grid.push(row);
  }

  slider = createSlider(0, 1, 0, 1);
  slider.style('width', '40px');
  button = createButton("Advance Once");
  button.mousePressed(advanceOnce);
}

function draw() {
  frame++;
  if (frame > 20) {
    frame = 0

  if (slider.value() == 1) {
    simulationStarted = true;
  } else {
    simulationStarted = false;
  }

  for (var r = 0; r < 32; r++) {
    for (var c = 0; c < 32; c++) {
      var cell = grid[r][c];
      cell.show();
    }
  }
  
  if (simulationStarted) {
    advanceOnce();
  }
}


  if (mouseIsPressed) {
    let mousePos = mousePosToGridPos(mouseX,mouseY);
    let clickedCell = grid[mousePos[0]][mousePos[1]];
    if (mouseButton === LEFT) {
    
    clickedCell.state = "alive"
    for (var r = 0; r < 32; r++) {
      for (var c = 0; c < 32; c++) {
        let cell = grid[r][c];
        cell.show();
      }
    }
  } else if (mouseButton === RIGHT) {
    clickedCell.state = "dead";
  }
  }
}

function advanceOnce() {
  for (var r = 0; r < 32; r++) {
    for (var c = 0; c < 32; c++) {
      var cell = grid[r][c];
      var numberAliveNeighbours = cell.numNeighbours(grid);
      if (cell.state == "dead" && numberAliveNeighbours == 3) {
        cell.stateTo = "alive";
      } else if (cell.state == "alive" && (numberAliveNeighbours < 2 || numberAliveNeighbours > 3)) {
        cell.stateTo = "dead";
      } else {
        cell.stateTo = cell.state;
      }

    }
  }

  for (var r = 0; r < 32; r++) {
    for (var c = 0; c < 32; c++) {
      var cell = grid[r][c];
      cell.setState();
    }
  }
}
function mousePosToGridPos(x,y) {
  let gridX = floor((x/25));
  let gridY = floor((y/25));
  return [gridX,gridY];
}