/**
 * SOCCER-PONG
 * Nadia Abdul Aziz
 * 
 * One sided pong, except it's soccer
 * Use the mouse to move the paddle and score a goal! Don't let the ball drop!
 */

"use strict";

//variables for images
let soccerBall;

let soccerNet;

let Goal;

let gameOverTxt;

//Loading images
function preload() {
    soccerBall = loadImage('/assets/images/soccerBall.png');
    soccerNet = loadImage('/assets/images/soccerNet.png');
    Goal = loadImage('/assets/images/Goal.png');
    gameOverTxt = loadImage('/assets/images/gameOver.png');
};

//Winning of game
let gameWon = false;

//End of game 
let gameOver = false;

//Goal Variables
const goalPositionY = 60;
const goalWidth = 200;
const goalHeight = 100;

// Soccer Ball Variables
let ball = {
    ballXPosition: 50,
    ballYPosition: 20,
    ballSpeed: 4,
    ballDirX: 0,
    ballDirY: 0,
};

//Paddle Variables
let paddle = {
    x: undefined,
    y: undefined,
    sizeX: 100,
    sizeY: 20,
};

/** Creates Canvas & dictates modes, global definitions */

function setup() {
    createCanvas(900, 650);
    rectMode(CENTER);
    imageMode(CENTER);

    //Defining paddle location in y
    paddle.y = height - 20;

    //Defining ball direction values to randomly generate with every iteration
    ball.ballDirX = random(1, 4);
    ball.ballDirY = random(1, 4);
};


/** Creates the background visuals, paddle, goal and ball */

function draw() {
    drawGrass();
    drawPaddle();
    drawBall();
    collisions();
    checkGameOver();
    checkGameWon();
};

// Draws ball
function drawBall() {
    push();
    // Move in X dir
    ball.ballXPosition += (ball.ballDirX * ball.ballSpeed);
    // Move in Y dir
    ball.ballYPosition += (ball.ballDirY * ball.ballSpeed);
    //image of ball
    image(soccerBall, ball.ballXPosition, ball.ballYPosition, 50, 50);
    pop();
};

// Draws paddle to kick ball
function drawPaddle() {
    push();
    noStroke();
    paddle.x = constrain(mouseX, 60, 840);
    rect(paddle.x, paddle.y, paddle.sizeX, paddle.sizeY);
    pop();
};

///////////FUNCTIONS TO DRAW FIELD

//Draws full field of grass
function drawGrass() {
    drawBg();
    drawLine();
};

//Draws background color, mapped to location of player paddle
function drawBg() {
    push();
    colorMode(HSB);
    let bgColor = {
        h: 150,
        s: 100,
        b: map(paddle.x, 60, 840, 50, 30),
    };
    background(bgColor.h, bgColor.s, bgColor.b);
    pop();
};

//Draws all lines + goal
function drawLine() {

    //general parameters
    push();
    stroke(255, 255, 255);
    strokeWeight(5);
    fill(50, 0);

    drawMiddleArc();
    drawFrame();
    drawGoalOutline();
    drawGoal();

    pop();
};

function drawFrame() {
    //Frame outline
    rect(width / 2, height / 2, width - 20, height - 20);
};

function drawMiddleArc() {
    //Middle of the field circle
    const arcSizeX = 200;
    const arcSizeY = 200;
    arc(width / 2, height - 15, arcSizeX, arcSizeY, PI, TWO_PI);
};

function drawGoalOutline() {
    //Goal outline, larger rectangle
    const rectPositionY = 85;
    const rectWidth = 400;
    const rectHeight = 150;
    rect(width / 2, rectPositionY, rectWidth, rectHeight);

    //Penalty arc
    const penaltyPositionY = rectPositionY + rectHeight / 2;
    const penaltySizeX = 200;
    const penaltySizeY = 200;
    arc(width / 2, penaltyPositionY, penaltySizeX, penaltySizeY, 0, PI);
};


function drawGoal() {
    //draw goal boundaries
    //image of goal
    image(soccerNet, width / 2, goalPositionY, goalWidth, goalHeight);
};

////////// FUNCTIONS FOR COLLISIONS

function collisions() {

    //collision of ball with field edge
    if (ball.ballXPosition >= width - 20) {
        ball.ballDirX = ball.ballDirX * -1 //Direction changes in X on the right side of the field
    }

    if (ball.ballXPosition <= 20) {
        ball.ballDirX = ball.ballDirX * -1 // Direction change but the left side of the field
    }

    //collision of ball against top edge (not goal)
    if (ball.ballYPosition <= 20) {
        ball.ballDirY = ball.ballDirY * -1 //Direction change downwards
    }
    //collision of ball against paddle (Used tutorial as reference with a lot of tweaks??? It works???? Kinda???)
    if (ball.ballYPosition + 10 >= paddle.y && ball.ballXPosition >= paddle.x - paddle.sizeX / 2 && ball.ballXPosition <= paddle.x + paddle.sizeX / 2) {
        ball.ballDirY = ball.ballDirY * -1; // Reverse the Y direction when the ball hits the paddle
    }
};

////////// ALL FUNCTIONS FOR GAME STATES

//verify location of ball for game over
function checkGameOver() {
    //check for game over, if ball escapes paddle
    if (ball.ballYPosition > height) {
        gameOver = true;
    }

    if (gameOver) {
        showYouLost();
    }
};

// ending screen 
function showYouLost() {

    push();
    colorMode(HSB);
    //Values in hsb as constants
    const gameOverFill = color(150, 100, 50);
    fill(gameOverFill);
    //New background color
    rect(width / 2, height / 2, width, height);
    pop();
    //Text game over
    push();
    image(gameOverTxt, width / 2, height / 2);
    pop();
};

// verify location of ball for winning game
function checkGameWon() {
    //check for game won if the ball enters goal boundaries
    if (ball.ballYPosition >= goalPositionY - goalHeight / 2 && ball.ballYPosition <= goalPositionY + goalHeight / 2 &&
        ball.ballXPosition >= width / 2 - goalWidth / 2 && ball.ballXPosition <= width / 2 + goalWidth / 2) {
        gameWon = true;
    }

    if (gameWon) {
        showYouWon();
    }
};

//ending screen
function showYouWon() {
    push();
    colorMode(HSB);
    //Values in hsb as constants
    const gameWonFill = color(150, 100, 50);
    fill(gameWonFill);
    //New background color
    rect(width / 2, height / 2, width, height);
    pop();
    //Game won icon, with mapping
    push();
    let fillColor = {
        r: map(mouseX, 0, 255, 0, 255),
        g: map(mouseY, 0, 255, 0, 255),
        b: map(mouseY, 0, 255, 0, 255),
    }
    fill(fillColor.r, fillColor.g, fillColor.b);
    rect(width / 2, height / 2, width / 2 + 40, height / 4);
    image(Goal, width / 2, height / 2);
    pop();
};

