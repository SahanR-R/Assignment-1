/**
 *  Game.js
 *  This file is responsible for running the game.
 *  Any further code written should go into this file.
 */

/* Global variables */
// reference to the score dialog html element
let scoreDialogRef = document.getElementById("scoreDialog");
// reference to the dialog title html element
let dialogTitleRef = document.getElementById("dialogTitle");
// reference to the next game button
let nextGameRef = document.getElementById("nextGame");
// referernce to the current level information at the top of the screen
let levelRef = document.getElementById("level");
// reference to the player name at the top of the screen
let playerRef = document.getElementById("player");
// reference to the score information at the top of the screen
let scoreRef = document.getElementById("score");
// reference to the space to display a countdown timer
let timerRef = document.getElementById("timer");

/*
	startGame Function
	This function is triggered by the 'Start Game' button on the 'index.html' page.

	This function is responsible for running all code related to starting the game for the first time.
	Note: You can add code to the function but you shouldn't delete any code from this function as it will break the app.
 */
function startGame(){
	// Hide the background image of the maze
	$("#img").hide();
	// Show the maze canvas
	canvas.show();
	// Get a reference to the 'Start Game' button on 'index.html'
	let elem = document.getElementById("startGame");
	// Actually delete the 'Start Game' button from the page as we no longer need it
	elem.parentNode.removeChild(elem);

	// Unhide the 'Next Game' button
	nextGameRef.hidden = false;
	// Disable the 'Next Game' button so that it can't be clicked on
	nextGameRef.disabled = true;

	// Draw the maze on the canvas
	draw(board);
}

/*
	goToNextLevel function
	This function is triggered when the user clicks on the 'next game' button to go to the next level.
 */
function goToNextLevel(){
	// TODO: Code for next level
}

// keypress code to detect which arrow key is pressed on the keyboard to move the ball
// This code runs as soon as the game is loaded and as you begin to play the next levels
//
//This code is responsible for moving the ball in left, right, up and down direction using the arrow keys on the keyboard.
//Note: You can add code to the function but you shouldn't delete any code from this function as it will break the app.
$(document).keyup(function(e){
    if((e.which == 38))//Up arrow
        player.y--;
    else if((e.which == 40)) // down arrow
        player.y++;
    else if((e.which == 37)) // to the left
        player.x--;
    else if((e.which == 39)) // to the right
        player.x++;
    draw(board);
    if(player.x == destination.x && player.y == destination.y)
    {
      // Enable the "Next Game" button so that it can be clicked on
      nextGameRef.disabled = false;
    }
    else{
      console.log("keep going");
    }
    e.preventDefault();
});
