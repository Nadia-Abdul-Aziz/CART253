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

// Our frogs
const player1 = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 490,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

const player2 = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 0,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

let leftArrowPressed = false;

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
}

function draw() {
    background('black');
    drawPlayer1();
    drawPlayer2();
}


/**
 * Moves the frog to the mouse position on x
 */

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawPlayer1() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(player1.tongue.x, player1.tongue.y, player1.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(player1.tongue.size);
    line(player1.tongue.x, player1.tongue.y, player1.body.x, player1.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(player1.body.x, player1.body.y, player1.body.size);
    pop();
}

function drawPlayer2() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(player2.tongue.x, player2.tongue.y, player2.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(player2.tongue.size);
    line(player2.tongue.x, player2.tongue.y, player2.body.x, player2.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(player2.body.x, player2.body.y, player2.body.size);
    pop();
}

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

if (leftArrowPressed) {
    player1.body.x -= 5;
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        leftArrowPressed = true;
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        leftArrowPressed = false;
    }
}

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