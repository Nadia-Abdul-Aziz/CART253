
/**
 * Sleep Invaders
 * 
 * Nadia Abdul Aziz
 * 
 * The title screen for a series of games based on the classic space invaders.
 * Click to select the desired game (stored in seperate html files)
 * 
 * Made with p5
 * https://p5js.org/
 */

//Image variable
let titleImage;

//loading said image
function preload() {
    titleImage = loadImage('assets/images/Pic1.jpg');
}

//setting up the canvas in the middle of the screen
function setup() {
    createCanvas(600, 400)
    background(255);
}

//drawing the image and a rectangle to fill the space
function draw() {
    drawBorder();
    image(titleImage, 3, 3, 400, height);
    drawRect();
    drawTitle();
}

//Just a border, fits with the aesthetic
function drawBorder() {
    push();
    stroke(255, 0, 0);
    strokeWeight(4);
    noFill();
    rect(0, 0, width, height);
    pop();
}

//The extra rectangle
function drawRect() {
    push();
    fill('black');
    rect(400, 325, 500, 80);
    pop();
}

//Drawing the title and subtitle
function drawTitle() {
    push();
    textSize(25);
    textStyle(BOLD);
    text('SLEEP INVADERS', 350, 50);
    pop();

    push();
    textSize(15);
    text('Choose your fight', 455, 80);
    text('against wakefulness', 440, 100);
    pop();
}