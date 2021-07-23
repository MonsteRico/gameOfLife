var cellSize = 25;
var aliveColor = "blue";
var deadColor = "white";
class Cell {
    // State - whether the cell is 'alive' or 'dead'
    // x - the x position of the cell within the grid array
    // y - the y position of the cell within the grid array
    constructor(state, x, y,color) {
        this.state = state;
        this.x = x;
        this.y = y;
        if (color) {
            this.color = color;
        } else {this.color = null;}
        this.stateTo;
        this.numberAliveNeighbours = 0;
    }

    show() {
        if (this.state == "alive") {
            fill(aliveColor);
        }
        else {
            fill(deadColor);
        }
        if (this.color) {
            fill(this.color);
        }
        rect(this.x*cellSize,this.y*cellSize,cellSize,cellSize)
    }

    numNeighbours(grid) {
        var neighbours = [];
        var number = 0;
        neighbours.push(this.findCell(grid, this.x-1,this.y));
        neighbours.push(this.findCell(grid, this.x-1,this.y-1));
        neighbours.push(this.findCell(grid, this.x,this.y-1));
        neighbours.push(this.findCell(grid, this.x+1,this.y-1));
        neighbours.push(this.findCell(grid, this.x+1,this.y));
        neighbours.push(this.findCell(grid, this.x+1,this.y+1));
        neighbours.push(this.findCell(grid, this.x,this.y+1));
        neighbours.push(this.findCell(grid, this.x-1,this.y+1));
        for (var i = 0; i < neighbours.length; i++) {
            if (neighbours[i] !== null) {
                if (neighbours[i].state == "alive") {
                    number++;
                }
            }
        }
        return number;
    }

    setState() {
        this.state = this.stateTo;
        this.stateTo = null;
    }

    findCell(grid, x,y) {
        if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) {
            return null;
        } else {
            return grid[x][y];
        }
    }

    setColor(color) {
        this.color = color;
    }
}

