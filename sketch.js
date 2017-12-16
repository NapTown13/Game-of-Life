
///Game of Life with colors
///

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 8;
let fr = 10;
let bornColor;
let diedColor;
let aliveColor;
let deadColor;
let timerReset = fr;
let timer = timerReset;

function setup() {
    createCanvas(600, 400);
    frameRate(fr);

    cols = width / resolution;
    rows = height / resolution;

    bornColor = color(0, 255, 0);
    diedColor = color(0, 0, 0);
    deadColor = color(0, 0, 0);
    aliveColor = color(0, 0, 255);

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = random(10) < 1;
        }
    }
}

function draw() {
    background(0);
    let newGrid = make2DArray(cols, rows);
    let colors = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let oldState = grid[i][j];
            let newState;

            let neighbors = countNeighbors(grid, i, j);

            if (oldState == 0 && neighbors == 3) {
                newState = 1;
            } else if (oldState == 1 && (neighbors < 2 || neighbors > 3)) {
                newState = 0;
            } else {
                newState = oldState;
            }

            let nextColor;
            if (newState == 0 && oldState == 0)
                nextColor = deadColor;
            else if (newState == 0 && oldState == 1)
                nextColor = diedColor;
            else if (newState == 1 && oldState == 0)
                nextColor = bornColor;
            else
                nextColor = aliveColor;

            newGrid[i][j] = newState;
            colors[i][j] = nextColor;
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            fill(colors[i][j]);
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
    }
    grid = newGrid;
    timer--;
    if (timer == 0) {
        // lazarus one cell
        grid[floor(random(cols))][floor(random(rows))] = 1;
        timer = timerReset;
    }
}


function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}
