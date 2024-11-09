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

// Array to store power tokens

let powerTokens = [];

//Variables for power tokens

//Each start with 2 tokens
let player1Tokens = 2;
let player2Tokens = 2;
//Maximum that can be stored
const maxTokens = 20;
//Amount needed to win
const winTokens = 20;


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
        distance: 0, //distance from origin spider NEEDED FOR THE TRIG CALCULATIONS!!!
        maxDistance: 0 //For power token distance calculation
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
        distance: 0,
        maxDistance: 0
    }
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES);
    bugs.push(createBug(5, 0.05));
    powerTokens.push(createPowerToken());
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
    drawPowerTokens();
    managePowerTokens();
    checkWebPowerTokenCollisions();
    checkAllWebBugOverlaps();
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
        if (player1.web.state === "idle" && player1Tokens > 0) {
            player1.web.state = "outbound";
            player1.web.distance = 0;
        }
    }

    if (keyCode === 83) { // S key
        if (player2.web.state === "idle" && player2Tokens > 0) {
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

// creating token properties
function createPowerToken() {
    return {
        x: 0,
        y: random(50, 430), // generation bounds, minimum distance of 1 token (50px)
        size: 15,
        speed: 7,
        value: 1 // power tokens given when collected
    };
}

// Drawing the power token, appearance
function drawPowerTokens() {
    for (let token of powerTokens) {
        push();
        noStroke();
        fill("yellow");
        ellipse(token.x, token.y, token.size);
        fill("black");
        textSize(10);
        textAlign(CENTER, CENTER);
        text("+", token.x, token.y); //Plus symbol in the middle
        pop();
    }
}

function calculateTokenCost(distance) {
    return Math.ceil(distance / 50);
}

// power token spawn logic
// Checked a few tutorials because...this was hard
function managePowerTokens() {
    for (let i = powerTokens.length - 1; i >= 0; i--) {
        let token = powerTokens[i];
        token.x += token.speed;
        //Generate new token once initial one reaches half the canvas
        if (token.x >= width / 2 && powerTokens.length === 1) {
            powerTokens.push(createPowerToken());
        }
        // generate new one if the token reaches the end of the canvas
        if (token.x > width) {
            powerTokens.splice(i, 1);
            if (powerTokens.length === 0) {
                powerTokens.push(createPowerToken());
            }
        }
    }
}

// Check web collision with all mines
function checkWebPowerTokenCollisions() {
    for (let i = powerTokens.length - 1; i >= 0; i--) {
        let token = powerTokens[i];

        // Check collision with player 1's web
        const distance1 = dist(player1.web.x, player1.web.y, token.x, token.y);
        if (distance1 < (player1.web.tipSize + token.size) / 2) {
            player1Tokens = Math.min(maxTokens, player1Tokens + token.value);
            powerTokens.splice(i, 1);
            continue;
        }

        // Check collision with player 2's web
        const distance2 = dist(player2.web.x, player2.web.y, token.x, token.y);
        if (distance2 < (player2.web.tipSize + token.size) / 2) {
            player2Tokens = Math.min(maxTokens, player2Tokens + token.value);
            powerTokens.splice(i, 1);
        }
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
    fill('yellow');
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(`Tokens: ${player1Tokens}`, 50, 470);
    text(`Size: ${player1.body.growthAmount}`, 320, 470);
    pop();

    push();
    fill('yellow');
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(`Tokens: ${player2Tokens}`, 50, 10);
    text(`Size: ${player2.body.growthAmount}`, 320, 10);
    pop();
}

function moveweb() {
    // Player 1 Web Logic
    if (player1.web.state === "idle") {
        // Reset web position and distance when idle
        player1.web.x = player1.body.x;
        player1.web.y = player1.body.y;
        player1.web.distance = 0;
    }
    else if (player1.web.state === "outbound") {
        // Calculate max allowed distance based on tokens
        const maxDistance = player1Tokens * 50; // Each token allows 50 pixels

        // Update web position
        player1.web.distance += player1.web.speed;
        let angle = -player1.body.rotation - 180;
        player1.web.x = player1.body.x + player1.web.distance * sin(angle);
        player1.web.y = player1.body.y + player1.web.distance * cos(angle);

        // Store the maximum distance reached for token cost calculation
        player1.web.maxDistance = player1.web.distance;

        // Check for maximum distance or border collision
        if (player1.web.distance >= maxDistance ||
            player1.web.y <= 0 ||
            player1.web.x <= 0 ||
            player1.web.x >= width) {
            player1.web.state = "inbound";
        }
    }
    else if (player1.web.state === "inbound") {
        // Retract web
        player1.web.distance -= player1.web.speed;
        let angle = -player1.body.rotation - 180;
        player1.web.x = player1.body.x + player1.web.distance * sin(angle);
        player1.web.y = player1.body.y + player1.web.distance * cos(angle);

        // Reset when fully retracted
        if (player1.web.distance <= 0) {
            player1.web.state = "idle";
            player1.web.x = player1.body.x;
            player1.web.y = player1.body.y;
            player1.web.distance = 0;
        }
    }

    // Player 2 Web Logic
    if (player2.web.state === "idle") {
        player2.web.x = player2.body.x;
        player2.web.y = player2.body.y;
        player2.web.distance = 0;
    }
    else if (player2.web.state === "outbound") {
        // Calculate max allowed distance based on tokens
        const maxDistance = player2Tokens * 50;

        // Update web position
        player2.web.distance += player2.web.speed;
        let angle = -player2.body.rotation;
        player2.web.x = player2.body.x + player2.web.distance * sin(angle);
        player2.web.y = player2.body.y + player2.web.distance * cos(angle);

        // Store the maximum distance reached for token cost calculation
        player2.web.maxDistance = player2.web.distance;

        // Check for maximum distance or border collision
        if (player2.web.distance >= maxDistance ||
            player2.web.y >= height ||
            player2.web.x <= 0 ||
            player2.web.x >= width) {
            player2.web.state = "inbound";
        }
    }
    else if (player2.web.state === "inbound") {
        // Retract web
        player2.web.distance -= player2.web.speed;
        let angle = -player2.body.rotation;
        player2.web.x = player2.body.x + player2.web.distance * sin(angle);
        player2.web.y = player2.body.y + player2.web.distance * cos(angle);

        // Reset when fully retracted
        if (player2.web.distance <= 0) {
            player2.web.state = "idle";
            player2.web.x = player2.body.x;
            player2.web.y = player2.body.y;
            player2.web.distance = 0;
        }
    }
}

function newSpawn() {
    // Constraining to max 10 bugs
    if (bugs.length < 10 && millis() - lastSpawnTime >= spawnInterval) {
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

    /// I don't know anymore with this trig stuff, I just look at documentation and assume it'll work, I wrote it a while ago and I don't actually know what this does, it does something. 
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
        if (player1.web.state !== "idle") {
            const d1 = dist(player1.web.x, player1.web.y, bug.x, bug.y);
            const caught1 = (d1 < player1.web.size / 2 + bug.size / 2);

            if (caught1) {
                const tokenCost = calculateTokenCost(player1.web.distance);
                player1Tokens -= tokenCost;

                if (player1Tokens <= 0) {
                    gameState = GAME_OVER;
                    return;
                }

                bugs.splice(bugs.indexOf(bug), 1);
                player1.web.state = "inbound";
                player1.body.growthAmount += 10;
                player1Size += 1;
                continue;
            }
        }

        if (player2.web.state !== "idle") {
            const d2 = dist(player2.web.x, player2.web.y, bug.x, bug.y);
            const caught2 = (d2 < player2.web.size / 2 + bug.size / 2);

            if (caught2) {
                const tokenCost = calculateTokenCost(player2.web.distance);
                player2Tokens -= tokenCost;

                if (player2Tokens <= 0) {
                    gameState = GAME_OVER;
                    return;
                }

                bugs.splice(bugs.indexOf(bug), 1);
                player2.web.state = "inbound";
                player2.body.growthAmount += 10;
                player2Size += 1;
            }
        }
    }
}
