/**
 * player1
 * Pippin Barr
 * 
 * A game of catching flies with your player1-web
 * 
 * Instructions:
 * - Move the player1 with your mouse
 * - Click to launch the web
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//Defining variables for images
let houstonImg;
let webImg;
let bugImg

//Loading assets
function preload() {
    houstonImg = loadImage('assets/images/homeIcon.png');
    webImg = loadImage('assets/images/webShoot.png');
    bugImg = loadImage('assets/images/bug.png');
}

//Array for bug spawning 
let bugs = [];

//Timer variables
let lastSpawnTime = 0;
const spawnInterval = 3000;

// // Bugs
// const bug = {
//     x: 0,
//     y: 240,
//     size: 50,
//     speed: 5,
//     yRange: 100,
//     moveAngle: 0, //Plz why did I do this to myself and decide to use angles everywhere in this project??? 
//     changeDirectionChance: 0.05 //Likelihood the bug switches directions and heads the other way, currently 5%
// };

//Object for keyboard rotation
let move = {
    leftKeyActive: false,
    rightKeyActive: false,
    aKeyActive: false,
    dKeyActive: false,
}

// Spiders
let player1 = {
    // Main body the player controls
    body: {
        x: 320,
        y: 480,
        size: 150,
        speed: 10,
        rotation: 0 //DEFAULT VALUE!!!!
    },
    //Thing the spider shoots to catch bugs
    web: {
        x: 320,
        y: 480,
        size: 1,
        tipSize: 75, //Different size for the tip to increase surface area
        speed: 20,
        state: "idle", //DEFAULT VALUE!!!
        distance: 0 //distance from origin spider NEEDED FOR THE TRIG CALCULATIONS!!!
    }
};

//Same as player1
let player2 = {
    body: {
        x: 320,
        y: 0,
        size: 150,
        speed: 10,
        rotation: 0
    },
    web: {
        x: 320,
        y: 0,
        size: 1,
        tipSize: 75,
        speed: 20,
        state: "idle",
        distance: 0
    }
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES);

    //make first bug
    spawnNewBug();
}

function draw() {
    background('black');
    drawBorder();
    drawBug();
    moveBug();
    moveSpider();
    moveweb()
    drawPlayer1();
    drawPlayer2();
    checkWebBugOverlap();
}

function drawBorder() {
    push();
    noFill();
    stroke(255); // Grey color
    strokeWeight(5); // Border thickness
    rect(0, 0, width, height);
    pop();
}

function keyPressed() {
    //Left and right
    if (keyCode === LEFT_ARROW) {
        move.leftKeyActive = true;
    }
    else if (keyCode === RIGHT_ARROW) {
        move.rightKeyActive = true;
    }
    //WASD, separate from previous statement because can be triggered together, alternatively could have been a switch statement
    if (keyCode === 68) {  // D key
        move.aKeyActive = true;
    }
    else if (keyCode === 65) {  // A key
        move.dKeyActive = true;
    }
    //Web of player 1 move
    if (keyCode === UP_ARROW) {
        // Only move the web if it is currently idle
        if (player1.web.state === "idle") {
            player1.web.state = "outbound";
            player1.web.distance = 0;
        }
    }

    if (keyCode === 83) {
        // Only move the web if it is currently idle
        if (player2.web.state === "idle") {
            player2.web.state = "outbound";
            player2.web.distance = 0;
        }
    }

}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        move.leftKeyActive = false;
    }
    else if (keyCode === RIGHT_ARROW) {
        move.rightKeyActive = false;
    }

    if (keyCode === 68) {  // D key
        move.aKeyActive = false;
    }
    else if (keyCode === 65) {  // A key
        move.dKeyActive = false;
    }
}

//Spider rotates by 1 pixel when the arrows are pressed, constrained to a maximum of 30 pixels on either side
function moveSpider() {
    if (move.leftKeyActive) {
        player1.body.rotation = constrain(player1.body.rotation - 1, -40, 40);
    }
    if (move.rightKeyActive) {
        player1.body.rotation = constrain(player1.body.rotation + 1, -40, 40);
    }

    if (move.aKeyActive) {
        player2.body.rotation = constrain(player2.body.rotation - 1, -40, 40);
    }
    if (move.dKeyActive) {
        player2.body.rotation = constrain(player2.body.rotation + 1, -40, 40);
    }
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
    rotate(player1.body.rotation);
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
    imageMode(CENTER);
    translate(player2.body.x, player2.body.y);
    rotate(player2.body.rotation);  // Apply the rotation
    image(houstonImg, 0, 0, player2.body.size, player2.body.size);
    pop();
}

function moveweb() {
    // Player 1 
    if (player1.web.state === "idle") {
        player1.web.x = player1.body.x;
        player1.web.y = player1.body.y;
        player1.web.distance = 0; //default distance is zero
    }
    else if (player1.web.state === "outbound") {
        player1.web.distance += player1.web.speed; //calculate position based on angle and distance
        let angle = -player1.body.rotation - 180; //using reversed angle
        player1.web.x = player1.body.x + player1.web.distance * sin(angle);
        player1.web.y = player1.body.y + player1.web.distance * cos(angle)

        //border collision adjusted to include hits to any border, with the exception of the same side the spider is on
        if (player1.web.y <= 0 || player1.web.x <= 0 || player1.web.x >= width) {
            player1.web.state = "inbound";
        }
    }
    else if (player1.web.state === "inbound") {
        player1.web.distance -= player1.web.speed;
        let angle = -player1.body.rotation - 180;
        player1.web.x = player1.body.x + player1.web.distance * sin(angle);
        player1.web.y = player1.body.y + player1.web.distance * cos(angle);

        if (player1.web.distance <= 0) {
            player1.web.state = "idle";
            player1.web.x = player1.body.x;
            player1.web.y = player1.body.y;
        }
    }

    // Player 2
    if (player2.web.state === "idle") {
        player2.web.x = player2.body.x;
        player2.web.y = player2.body.y;
        player2.web.distance = 0;
    }
    else if (player2.web.state === "outbound") {
        player2.web.distance += player2.web.speed;
        let angle = -player2.body.rotation;
        player2.web.x = player2.body.x + player2.web.distance * sin(angle);
        player2.web.y = player2.body.y + player2.web.distance * cos(angle);

        if (player2.web.y >= height || player2.web.x <= 0 || player2.web.x >= width) {
            player2.web.state = "inbound";
        }
    }
    else if (player2.web.state === "inbound") {
        player2.web.distance -= player2.web.speed;
        let angle = -player2.body.rotation;
        player2.web.x = player2.body.x + player2.web.distance * sin(angle);
        player2.web.y = player2.body.y + player2.web.distance * cos(angle);

        if (player2.web.distance <= 0) {
            player2.web.state = "idle";
            player2.web.x = player2.body.x;
            player2.web.y = player2.body.y;
        }
    }
}

function spawnNewBug() {
    bugs.push({
        x: 0,
        y: random(height),
        size: 50,
        speed: 5,
        yRange: 100,
        moveAngle: random(-45, 45),
        changeDirectionChance: 0.05
    });
}

function spawnBugAgain() {

    if (millis() - lastSpawnTime > spawnInterval) {
        spawnNewBug();
        lastSpawnTime = millis();
    }

    // Update and draw all bugs
    for (let bug of bugs) {
        moveBug(bug);
        drawBug(bug);
    }
    
}


function moveBug() {

    if (random() < bug.changeDirectionChance) {
        // Add a random angle change between -60 and 60 degrees to create more natural movement
        bug.moveAngle += random(-60, 60);
    }

    // Move bug based on current angle
    bug.x += cos(bug.moveAngle) * bug.speed;
    bug.y += sin(bug.moveAngle) * bug.speed;

    // Check wall collisions and change direction immediately
    let hitWall = false;

    // Left wall
    if (bug.x < 0) {
        bug.x = 0;
        bug.moveAngle = -bug.moveAngle + 180;
        hitWall = true;
    }
    // Right wall
    else if (bug.x > width - bug.size) {
        bug.x = width - bug.size;
        bug.moveAngle = -bug.moveAngle + 180;
        hitWall = true;
    }

    // Top wall
    if (bug.y < 0) {
        bug.y = 0;
        bug.moveAngle = -bug.moveAngle;
        hitWall = true;
    }
    // Bottom wall
    else if (bug.y > height - bug.size) {
        bug.y = height - bug.size;
        bug.moveAngle = -bug.moveAngle;
        hitWall = true;
    }
}

function drawBug() {
    image(bugImg, bug.x, bug.y, bug.size, bug.size);
}

function checkWebBugOverlap() {
    // Check overlap for player 1
    const d1 = dist(player1.web.x, player1.web.y, bug.x, bug.y);
    const caught1 = (d1 < player1.web.size / 2 + bug.size / 2);
    if (caught1) {
        resetBug();
        player1.web.state = "inbound";
    }

    // Check overlap for player 2
    const d2 = dist(player2.web.x, player2.web.y, bug.x, bug.y);
    const caught2 = (d2 < player2.web.size / 2 + bug.size / 2);
    if (caught2) {
        resetBug();
        player2.web.state = "inbound";
    }
}

function resetBug() {
    // bug.x = 0;
    // bug.y = random(bug.yRange, height - bug.yRange);
    // bug.speed += 0.5;
    bug.x = 0;
    bug.y = random(height);
    bug.moveAngle = random(-45, 45); // Start moving generally rightward
}