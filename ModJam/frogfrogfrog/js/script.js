/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let houstonImg;
let webImg;

function preload() {
    houstonImg = loadImage('assets/images/homeIcon.png');
    webImg = loadImage('assets/images/webShoot.png');
}

// Our frogs
let player1 = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 480,
        size: 150,
        speed: 10
    },
    web: {
        x: 320,
        y: 480,
        size: 1,
        tipSize: 100,
        speed: 20,
        state: "idle"
    }
};

let player2 = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 0,
        size: 150,
        speed: 10
    },
    web: {
        x: 320,
        y: 0,
        size: 1,
        tipSize: 100,
        speed: 20,
        state: "idle"
    }
};

let leftArrowPressed = false;

// if (leftArrowPressed) {
//     player1.body.x -= rotate(QUARTER_PI);
// }

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES);
}

function draw() {
    background('black');
    drawBorder();
    // keyPressed();
    // keyReleased();
    drawPlayer1();
    drawPlayer2();
}

function drawBorder() {
    push();
    noFill();
    stroke(255); // Grey color
    strokeWeight(5); // Border thickness
    rect(0, 0, width, height);
    pop();
}

function drawPlayer1() {
    push();
    stroke("white");
    strokeWeight(player1.web.size);
    line(player1.web.x, player1.web.y, player1.body.x, player1.body.y);
    pop();

    imageMode(CENTER);
    image(webImg, player1.web.x, player1.web.y, player1.web.tipSize, player1.web.tipSize);

    push();
    imageMode(CENTER);
    translate(player1.body.x, player1.body.y);
    rotate(180);
    image(houstonImg, 0, 0, player1.body.size, player1.body.size);
    pop();
}

function drawPlayer2() {
    push();
    stroke("white");
    strokeWeight(player2.web.size);
    line(player2.web.x, player2.web.y, player2.body.x, player2.body.y);
    pop();

    push();
    imageMode(CENTER);
    translate(player2.web.x, player2.web.y);
    rotate(180);
    image(webImg, 0, 0, player2.web.tipSize, player2.web.tipSize);
    pop();

    push();
    image(houstonImg, player2.body.x, player2.body.y, player2.body.size, player2.body.size);
    pop();
}

// function keyPressed() {
//     if (keyCode === LEFT_ARROW) {
//         leftArrowPressed = true;
//     }
// }

// function keyReleased() {
//     if (keyCode === LEFT_ARROW) {
//         leftArrowPressed = false;
//     }
// }

/**
 * Handles moving the tongue based on its state
 */
// function moveTongue() {
//     // Tongue matches the frog's x
//     frog.tongue.x = frog.body.x;
//     // If the tongue is idle, it doesn't do anything
//     if (frog.tongue.state === "idle") {
//         // Do nothing
//     }
//     // If the tongue is outbound, it moves up
//     else if (frog.tongue.state === "outbound") {
//         frog.tongue.y += -frog.tongue.speed;
//         // The tongue bounces back if it hits the top
//         if (frog.tongue.y <= 0) {
//             frog.tongue.state = "inbound";
//         }
//     }
//     // If the tongue is inbound, it moves down
//     else if (frog.tongue.state === "inbound") {
//         frog.tongue.y += frog.tongue.speed;
//         // The tongue stops if it hits the bottom
//         if (frog.tongue.y >= height) {
//             frog.tongue.state = "idle";
//         }
//     }
// }

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */



/**
 * Handles the tongue overlapping the fly
 */
// function checkTongueFlyOverlap() {
//     // Get distance from tongue to fly
//     const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
//     // Check if it's an overlap
//     const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
//     if (eaten) {
//         // Reset the fly
//         resetFly();
//         // Bring back the tongue
//         frog.tongue.state = "inbound";
//     }
// }

/**
 * Launch the tongue on click (if it's not launched yet)
 */
// function keyPressed() {
//     if (frog.tongue.state === "idle") {
//         frog.tongue.state = "outbound";
//     }
// }