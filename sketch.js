
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
let deadColor1;
let deadColor2;
let timerReset = fr;
let timer = timerReset;

function setup() {
    createCanvas(800, 400);
    frameRate(fr);

    cols = width / resolution;
    rows = height / resolution;

    bornColor = color(255);
    deadColor = color(0);
    aliveColor = color(255);
    diedColor = deadColor;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = random(12) < 1;           
        }
    }
}

function mousePressed() {

    deadColor = color(random(255), random(255), random(255));
    bornColor = color(random(255), random(255), random(255));
    aliveColor = color(random(255), random(255), random(255));
    diedColor = deadColor;
}

function draw() {
   // background(255,0,0);
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
            stroke(deadColor);
            rect(x, y, resolution - 1, resolution - 1);
        }
    }

    grid = newGrid;
    timer--;
    if (timer == 0) {
        let i = floor(random(cols - 5));
        let j = floor(random(rows - 5));
        live(i, j);
        timer = timerReset;
    }
}

function makeBlock(i, j) {
    live(i, j);
    live(i + 1, j);
    live(i, j - 1);
    live(i + 1, j - 1);
}

function makeGlider(i, j) {
    grid[i][j] = 1;
    grid[i + 1][j] = 1;
    grid[i + 2][j] = 1;
    grid[i + 2][j - 1] = 1;
    grid[i + 1][j - 2] = 1;
}

function live(i, j) {
    grid[i][j] = 1;
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
