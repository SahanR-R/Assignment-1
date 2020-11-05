/**
 *  Driver.js
 *  This file stores the code libraries used in the Maze App
 *
 *  No further code should be added to this file.
 */

/*
    Define global variables
 */
let sensor = null; // used for the device sensor
let level = 1; // initial level is 1
let sizeOfBoard = 4; // default board size is 4x4
let canvasContext; // used to store the canvas context
let canvas = $('#canvas'); // canvas on the page
let canvasRef = document.getElementById("canvas"); // reference to canvas html element
let path = []; // used to store the path returned from solveMaze
let destination = {}; // used to store the exit of the maze

// board is used to store the data matrix representing the maze
// Key: 0 = empty space; 1 = wall; -1 = exit
let board = [
              [0,0,0,0],
              [0,0,1,0],
              [0,0,0,0],
              [0,1,1,-1]
];

// Hide the canvas on page load
canvas.hide();

// location of the player is fixed to the [0][0] of the matrix
// x is horizontal and y is vertical
let player = {
    x: 0,
    y: 0
};

/*
    draw function
    This function takes one parameter, maze.

    The function draws the maze onto the canvas using the data matrix representation
    of the maze in the parameter, maze.

    The maze data matrix provided in the parameter must be two dimensional
    (i.e. an array of arrays)

    You should ensure that it is possible to reach the exit by running the solveMaze function first.
 */
function draw(maze){
    // store the width of the canvas space
    let width = canvas.width();
    // ensuring each 'block' on the screen will be an equal size
    let blockSize = width/maze.length;
    // get the drawing surface on the canvas
    canvasContext = canvas[0].getContext('2d');
    // reset transform matrix on canvas
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    // clear the canvas of existing content
    canvasContext.clearRect(0, 0, width, width);
     // define block color
    canvasContext.fillStyle="black";
    // draw the actual maze on the canvas
    for (let y = 0; y < maze.length; y++){
        for (let x = 0; x < maze[y].length; x++){
            // Draw a wall if the current cell is '1'
            if (maze[y][x] === 1){
                canvasContext.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }

            // Draw the goal if the current cell is '-1'
            if (maze[y][x] === -1){
                // store the exit location
                destination = {x: x, y: y};
                // Goal is represented by a gold colored "X"
                canvasContext.beginPath();
                canvasContext.lineWidth = 3;
                canvasContext.strokeStyle = "gold";
                canvasContext.moveTo(x*blockSize, y*blockSize);
                canvasContext.lineTo((x+1)*blockSize, (y+1)*blockSize);
                canvasContext.moveTo(x*blockSize, (y+1)*blockSize);
                canvasContext.lineTo((x+1)*blockSize, y*blockSize);
                canvasContext.stroke();
            }
        }
    }
    // Draw the 'player' as a blue ball in the starting location
    canvasContext.beginPath();
    let half = blockSize/2;
    canvasContext.fillStyle = "blue";
    canvasContext.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
    canvasContext.fill();
}

/*
    solveMaze function
    The function has two parameters, column and row which represent the location of the player.
    This function is called to check that the generated maze data matrix has a valid path from the player
    to the exist.

    Typically it is called with solveMaze(0,0) as x,y = 0,0 for the location of the player

    The function will return an array containing strings of "no" and a single "reached" if
    it was possible to reach the goal

    You can then check to see if the array contains the string "reached" to determine if the
    generated maze data matrix will have a reachable solution using Array.includes

    If it doesn't contain "reached" then you should generate a new maze data matrix
 */
function solveMaze(column, row){
    let maze = [];
    maze = Array.from(board); // the global variable board
    if(maze[column][row] == -1){
        console.log("We solved the maze at (" + column + ", " + row + ")");
        path.push("reached");
    }
    else if(maze[column][row] == 0){ // no walls
        console.log("At valid position (" + column + ", " + row + ")");
        maze[column][row] = 9;
        if(column < maze.length - 1){
          path.push("no");
          solveMaze(column + 1, row);
        }
        if(row < maze[column].length - 1){
          path.push("no");
          solveMaze(column, row + 1);
        }
        if(column > 0){
          path.push("no");
          solveMaze(column - 1, row);
        }
        if(row > 0){
          path.push("no");
          solveMaze(column, row - 1);
        }
    }
    return path;
}

/*
    showDialog function
    This function is used to display a dialog box to the user.
    (a pop-up overlay box)

    To use it, you need to set the content into the following global references defined in game.js:
    Set the title text
    dialogTitleRef.textContent = "RESULT_TEXT";

    Set the score information (at top of screen)
    scoreRef.textContent = "SCORE_TEXT";

    Set the score information inside the dialog box
    scoreDialogRef.innerHTML = "SCORE_INFO";

    and then you can call showDialog() to display the text to the user.

    Note: you can set any of the three to be blank strings "" - use what you need.
 */
function showDialog(){
  let dialog = document.querySelector('dialog');
  if (!dialog.showModal)
  {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.showModal();
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });
}
