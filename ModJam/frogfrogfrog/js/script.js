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

// Array to store all bugs
let bugs = [];

// Time variables for bug spawn
let lastSpawnTime = 0;
const spawnInterval = 3000 //3 seconds

// Variables for size counter

let player1Size = 0;
let player2Size = 0;

function createBug(speed, directionChance) {
    const bug = {
        // Position (random start from left side)
        x: 0,
        y: random(height),
        // Size (default)
        size: 50,
        // Movement properties (parameters)
        speed: speed,
        changeDirectionChance: directionChance,
        // Random starting angle (dynamic)
        moveAngle: random(-45, 45),
        // Default range
        yRange: 100
    };
    return bug;
}

const mine = {
    x: 0,
    y: 240,
    size: 10,
    speed: 7,
    collisionRadius: 30
};

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
        rotation: 0, //DEFAULT VALUE!!!!
        growthAmount: 0 //DEFAULT VALUE!!!!
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
        rotation: 0,
        growthAmount: 0
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
    bugs.push(createBug(5, 0.05));
    resetMine()
}

function draw() {
    background('black');
    drawBorder();
    newSpawn();
    drawBug();
    moveSpider();
    moveweb();
    drawPlayer1();
    drawPlayer2();
    displaySize();
    checkAllWebBugOverlaps();
    drawMine()
    moveMine();
    checkWebMineOverlap()
}

function drawBorder() {
    push();
    noFill();
    stroke(255);
    strokeWeight(5);
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

function drawMine() {
    push();
    noStroke();
    fill("red");
    ellipse(mine.x, mine.y, mine.size);
    pop();
}

function moveMine() {
    mine.x += mine.speed;
    if (mine.x > width) {
        resetMine();
    }
}

function resetMine() {
    mine.x = 0;
    mine.y = random(100, 380);
}

function checkWebMineOverlap() {
    // Calculate the distance between the web and the mine
    const distance = dist(player1.web.x, player1.web.y, player1.x, mine.y);

    // Define a collision threshold
    const collisionThreshold = (player1.web.size + mine.collisionRadius) / 2;

    // Check if the distance is less than the collision threshold
    if (distance < collisionThreshold) {
        gameState = GAME_OVER;
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
    image(houstonImg, 0, 0, player1.body.size + player1.body.growthAmount, player1.body.size + player1.body.growthAmount);
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
    image(houstonImg, 0, 0, player2.body.size + player2.body.growthAmount, player2.body.size + player2.body.growthAmount);
    pop();
}

function displaySize() {
    push();
    fill('red');
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(player1.body.growthAmount, 320, 470);
    pop();

    push();
    fill('red');
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(player2.body.growthAmount, 320, 10);
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

function newSpawn() {
    if (millis() - lastSpawnTime >= spawnInterval) {
        const newSpeed = random(5, 8);
        const newDirectionChance = random(0.05, 0.1);
        bugs.push(createBug(newSpeed, newDirectionChance));
        lastSpawnTime = millis();
    }
}

function drawBug() {

    for (let bug of bugs) {
        moveSingleBug(bug);
        drawSingleBug(bug);
    }
}

function moveSingleBug(bug) {
    if (random() < bug.changeDirectionChance) {
        bug.moveAngle += random(-60, 60);
    }

    bug.x += cos(bug.moveAngle) * bug.speed;
    bug.y += sin(bug.moveAngle) * bug.speed;

    // Wall collisions
    if (bug.x < 0) {
        bug.x = 0;
        bug.moveAngle = -bug.moveAngle + 180;
    }
    else if (bug.x > width - bug.size) {
        bug.x = width - bug.size;
        bug.moveAngle = -bug.moveAngle + 180;
    }

    if (bug.y < 0) {
        bug.y = 0;
        bug.moveAngle = -bug.moveAngle;
    }
    else if (bug.y > height - bug.size) {
        bug.y = height - bug.size;
        bug.moveAngle = -bug.moveAngle;
    }
}

function drawSingleBug(bug) {
    image(bugImg, bug.x, bug.y, bug.size, bug.size);
}

function checkAllWebBugOverlaps() {
    for (let bug of bugs) {
        const d1 = dist(player1.web.x, player1.web.y, bug.x, bug.y);
        const caught1 = (d1 < player1.web.size / 2 + bug.size / 2);

        const d2 = dist(player2.web.x, player2.web.y, bug.x, bug.y);
        const caught2 = (d2 < player2.web.size / 2 + bug.size / 2);

        if (caught1 || caught2) {
            let index = bugs.indexOf(bug);
            bugs.splice(index, 1);

            if (caught1) {
                player1.web.state = "inbound";
                player1.body.growthAmount += 10;
                player1Size += 1;
            } else {
                player2.web.state = "inbound";
                player2.body.growthAmount += 10;
                player2Size += 1;
            }
        }
    }
}