/**
 * The Chess Board
 * Nadia Abdul Aziz
 * 
 * A static representation of a chess board
 * It is square as per the dimensions of a true board
 * Doesn't actually do anything at the moment
 */

"use strict";

/**
 * Creates the main canvas for the board
 */
function setup() {
    // Draws canvas at given resolution (WxH in px)
    createCanvas(900, 900);
}
/**
 * materializes and colors the board, adds all the white squares to yield playing tiles  
 */
function draw() {
    // Background color of the board (RGB, Black)
    background(0);
    // White Squares (Left point x, Left point y, W, H)
    rect(50, 50, 100, 100)
    rect(250, 50, 100, 100)
    rect(450, 50, 100, 100)
    rect(650, 50, 100, 100)
    rect(150, 150, 100, 100)
    rect(350, 150, 100, 100)
    rect(550, 150, 100, 100)
    rect(750, 150, 100, 100)
    rect(50, 250, 100, 100)
    rect(250, 250, 100, 100)
    rect(450, 250, 100, 100)
    rect(650, 250, 100, 100)
    rect(150, 350, 100, 100)
    rect(350, 350, 100, 100)
    rect(550, 350, 100, 100)
    rect(750, 350, 100, 100)
    rect(50, 450, 100, 100)
    rect(250, 450, 100, 100)
    rect(450, 450, 100, 100)
    rect(650, 450, 100, 100)
    rect(150, 550, 100, 100)
    rect(350, 550, 100, 100)
    rect(550, 550, 100, 100)
    rect(750, 550, 100, 100)
    rect(50, 650, 100, 100)
    rect(250, 650, 100, 100)
    rect(450, 650, 100, 100)
    rect(650, 650, 100, 100)
    rect(150, 750, 100, 100)
    rect(350, 750, 100, 100)
    rect(550, 750, 100, 100)
    rect(750, 750, 100, 100)
}
/**
 * IMPORTANT REMINDERS FOR ME!!
 *      CASE SENSITIVE, CMD WILL NOT BE VALID WITH WRONG CAPS!!
 *      SHOULD HAVE LINE ON LEFT!!! CODE WILL NOT RUN IF NOT, SOMETHING IS WRONG
 * NOTES FOR ME!!!
 *      FUNCTION SETUP
 *          executes once at the beginning of the program
 *          tells computer what to do and brackets tells what to do for command (content)
 *      FUNCTION DRAW
 *          executes every frame 
 * GENERIC NOTES FOR ME!!
 *      Function calls are pre-written code, do not need to know how it works
 *      Press tab before writing
 *      /star star = tells computer not to read, multi line
 *      // = tells computer not to read, single line
 *      semicolon = command finished
 *      always put spaces after the comma
 *      greyscale only needs one number in rgb
 * QUESTIONS?
 *      Why background is every frame but canvas is not?
 */