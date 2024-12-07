/**
 * PLEASE!! MAKE IT STOP!!
 * 
 * Nadia Abdul Aziz
 * 
 * The second of four games based on space invaders. The player does not have the ability to win this game (or do they?) and are faced with the unavoidable after three unsuccessful attempts.
 * Your alarms have surrounded you and you cannot escape the dreaded wake up call! 
 * 
 * 
 * Instructions:
 * - Use the left and right arrow keys to move
 * - Use the up arrow key to shoot upwards, use the down arrow key to shoot downwards
 * - Make your best attempt at silencing the alarms.
 * - Just because it is pointless, doesn't mean you shouldn't try
 * 
 * Made with p5
 * https://p5js.org/
 * 
 * Modified the code of clock invaders, same base code, not very many comments except for the changes made.
 * Removed all direction change functionality from the previous game
 */

// image variables
let playerImg;
let enemyImg;
let bulletImg;
let lossImg;
let winImg;
let defeatImg;

// Game states
const titleScreen = 'title screen';
const gamePlaying = 'playing';
const gameOver = 'game over';
const gameWon = 'game won'; //pointless, but exists in case some insane person makes it through
const gameOverThreeTimes = 'game over three times'; // New game state when the player loses three times

// Track the current state of the game
let gameState = titleScreen;

let gameOverInitialized = false;
let gameWonInitialized = false;
let gameOverThreeTimesInitialized = false; // Initialize for the new game state

// Track the number of game overs
let gameOverCount = 0;

//Angry guy
let player = {
    x: 250,
    y: 240,
    width: 150,
    height: 150,
    speed: 5,
    cooldown: 0
};

// the pillows
let bullet = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    active: false,
    speed: 7
};

// Array to store alarm clocks
let enemies = [];
const enemyRows = 20;     // Stupidly huge number, making it impossible but still technically possible if someone is really motivated
const enemyCols = 6;     // Number of columns

//Load all images
function preload() {
    playerImg = loadImage('assets/images/face.png');
    enemyImg = loadImage('assets/images/clock.png');
    bulletImg = loadImage('assets/images/pillow.png');
    lossImg = loadImage('assets/images/loss.jpg');
    winImg = loadImage('assets/images/z.png')
    defeatImg = loadImage('assets/images/defeat.png') //new image for gameOverThreeTimes
}


function setup() {
    createCanvas(640, 480);
    imageMode(CENTER);
    // Initialize enemies from the top
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100,
                y: -60 - row * 60, // Start above the screen
                width: 50,
                height: 45,
                alive: true,
                speed: 0.5 // Move downwards
            });
        }
    }
    // Initialize enemies from the bottom
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100,
                y: height + 60 + row * 60, // Start below the screen
                width: 50,
                height: 45,
                alive: true,
                speed: -0.5 // Move upwards
            });
        }
    }
}

function draw() {
    // Use a switch statement to handle different game states
    switch (gameState) {
        case titleScreen:
            background(255);
            drawBorder();
            drawTitleScreen();
            break;
        case gamePlaying:
            background(255);
            drawBorder();
            updateGame();
            break;
        case gameOver:
            if (!gameOverInitialized) {
                gameOverCount++; // Increment the new game over counter to track how many times the user lost.
                initializeGameOver();
                gameOverInitialized = true;
            }
            background(255);
            drawBorder();
            drawGameOverScreen();
            if (gameOverCount >= 3) {
                gameState = gameOverThreeTimes; // Transition to new game over state if the player loses three times
            }
            break;
        case gameWon:
            if (!gameWonInitialized) {
                initializeGameWon();
                gameWonInitialized = true;
                //Winning screen, prompt to go back home
            }
            background(255);
            drawBorder();
            initializeGameWon();
            break;
        case gameOverThreeTimes: //the new state
            if (!gameOverThreeTimesInitialized) {
                initializeGameOverThreeTimes();
                gameOverThreeTimesInitialized = true;
            }
            background(255); //still putting this here to clear
            drawBorder(); //I need to put this here too because it wasn't working globally.
            drawGameOverThreeTimesScreen();
            break;
    }
    // Show/hide the hyperlink based on gameState, added the new state
    let homeLink = document.getElementById('homeLink');
    if (gameState === gameWon || gameState === gameOverThreeTimes) {
        homeLink.style.display = 'block';
    } else {
        homeLink.style.display = 'none';
    }
}

//the border
function drawBorder() {
    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(5);
    rect(0, 0, width, height);
    pop();
}

//drawing all the instructions and intro
function drawTitleScreen() {
    textAlign(CENTER, CENTER);

    //title
    push();
    fill('black');
    textSize(40);
    textStyle(BOLD);
    text('PLEASE!! MAKE IT STOP!!!', width / 2, height * 0.15);

    //image
    imageMode(CENTER);
    image(bulletImg, width / 2, height * 0.32, 90, 80);

    //subtitle
    textSize(18);
    textStyle(BOLD);
    text('HOW TO PLAY', width / 2, height * 0.5);

    //instructions
    textStyle(NORMAL);
    textSize(14);
    text('1. Use LEFT and RIGHT arrow keys to defend your spot in the warmth of your blanket!', width / 2, height * 0.6);
    text('2. Press the UP and DOWN arrow keys to silence the tyrants...well, if you can!', width / 2, height * 0.65);
    text('3. Want 5 more minutes? Vanquish your endless alarms...', width / 2, height * 0.7);

    //play button
    fill('red');
    textStyle(BOLD);
    textSize(16);
    text('Press the__SPACEBAR__to begin', width / 2, height * 0.85);

    pop();
}

//All gameplay functions
function updateGame() {

    if (gameState === gamePlaying) {
        updateEnemy();
        drawPlayer();
        movePlayer();
        shootBullet();
    }

};

//Draws the image for the player
function drawPlayer() {
    push();

    translate(player.x + player.width / 2, player.y + player.height / 2);

    image(playerImg, 0, -70, player.width, player.height);

    pop();
};

//Handles keyboard input to move the angry man
function movePlayer() {

    if (keyIsDown(LEFT_ARROW) && player.x > 0) {
        player.x -= player.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && player.x < width - player.width) {
        player.x += player.speed;
    }

}

//Anything to do with flinging the pillows at the clocks
function shootBullet() {
    if (player.cooldown > 0) {
        player.cooldown--;
    }
    if (bullet.active) {
        image(bulletImg, bullet.x + bullet.width / 2, bullet.y + bullet.height / 2,
            bullet.width, bullet.height);
        bullet.y -= bullet.speed;  // Move bullet towards direction pressed

        // Deactivate pillow if it goes off screen in both directions
        if (bullet.y < 0 || bullet.y > height) {
            bullet.active = false;
        }
    }
}

//Everything to do with the alarm clocks
function updateEnemy() {

    //variables
    let enemiesAlive = false;

    // Check if enemies need to change direction
    // forEach iterates through the array, was the most efficient way I found.
    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemiesAlive = true;
            //Removed enemy direction change code
        }
    });

    //Update enemy positions and check for collisions
    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemy.y += enemy.speed;

            // Draw the actual clock
            image(enemyImg, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2,
                enemy.width, enemy.height);

            // Check for bullet collision
            if (bullet.active && collision(bullet, enemy)) {
                enemy.alive = false;
                bullet.active = false;
            }

            // Check if enemies have reached the player's line
            if (enemy.y < player.y + player.height / 2 - 40 && enemy.speed < 0 || enemy.y > player.y - player.height / 2 + 40 && enemy.speed > 0) {
                gameState = gameOver;
            }
        }
    });


    // Check if all enemies are defeated, trigger win screen, pretty much impossible
    if (!enemiesAlive) {
        gameState = gameWon;
    }
}

// Check collision between two variables
function collision(bullet, enemy) {
    return bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y;
}

// Handles user input
function keyPressed() {

    //Press the spacebar to start the game
    if (keyCode === 32 && gameState === titleScreen) {
        gameState = gamePlaying;
        return;
    }

    // Shoot bullet upwards
    if (keyCode === UP_ARROW && !bullet.active && player.cooldown === 0) {
        bullet.active = true;
        bullet.x = player.x + player.width / 2 - bullet.width / 2;
        bullet.y = player.y;
        bullet.speed = 7; //positive speed for upward movement
        player.cooldown = 15;
    }

    // Shoot bullet downwards
    if (keyCode === DOWN_ARROW && !bullet.active && player.cooldown === 0) {
        bullet.active = true;
        bullet.x = player.x + player.width / 2 - bullet.width / 2;
        bullet.y = player.y;
        bullet.speed = -7; //negative speed for downward movement
        player.cooldown = 15;
    }

    // Restart game when spacebar is pressed during game over state
    if (keyCode === 32 && gameState === gameOver) {
        resetGame();
    }
}

function initializeGameOver() {
    let gameOverText = "Game Over!"; // Defined variable for game over text

    textAlign(CENTER, CENTER);

    push();
    // Display win
    fill('black');
    textStyle(BOLD);
    textSize(24);
    text(gameOverText, width / 2, height / 2 - 100);
    pop();

    // Center the image
    push();
    imageMode(CENTER);
    image(lossImg, width / 2, height / 2, 200, 150);
    pop();

    push();
    // Button text
    fill('red');
    textStyle(BOLD);
    textSize(14);
    text('Press the __SPACEBAR__ to Restart', width / 2, height / 2 + 100);
    pop();
}

//Added this function to draw only the game over screen
function drawGameOverScreen() {
    initializeGameOver();
}

// Reset the game to its initial state
function resetGame() {
    // Reset game state
    gameState = gamePlaying;
    gameOverInitialized = false;
    gameWonInitialized = false;
    gameOverThreeTimesInitialized = false; // Reset for the new game state

    // Reset player position and cooldown
    player.x = 250;
    player.y = 240;
    player.cooldown = 0;
    player.width = 150;
    player.height = 150;

    // Reset bullet
    bullet.active = false;
    bullet.width = 50;
    bullet.height = 50;

    // Recreate enemy grid, up and down
    enemies = [];
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100,
                y: -60 - row * 60, // Start above the screen
                width: 50,
                height: 45,
                alive: true,
                speed: 0.5
            });
        }
    }
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100,
                y: height + 60 + row * 60, //below
                width: 50,
                height: 45,
                alive: true,
                speed: -0.5
            });
        }
    }

    removeElements();
}

//game won screen 
function initializeGameWon() {

    let gameWonText = "You Win!";

    textAlign(CENTER, CENTER);

    push();
    // Display win
    fill('black');
    textStyle(BOLD);
    textSize(24);
    text(gameWonText, width / 2, height / 2 - 90);
    pop();

    push();
    imageMode(CENTER);
    image(winImg, width / 2, height / 2, 100, 50);
    pop();
}

//drawing the screen when the player loses too much
function initializeGameOverThreeTimes() {
    let gameOverThreeText = "THERE'S NO WINNING THIS ONE"; // Defined variable for game over text

    let gameOverThreeSubtitle = "You must get up and face your problems..."; // Defined subtitle


    textAlign(CENTER, CENTER);

    push();
    // Display loss
    fill('black');
    textStyle(BOLD);
    textSize(24);
    text(gameOverThreeText, width / 2, height / 2 - 100);
    pop();

    push();
    // Display subtitle
    fill('black');
    textSize(15);
    text(gameOverThreeSubtitle, width / 2, height / 2 - 60);
    pop();

    //image
    push();
    imageMode(CENTER);
    image(defeatImg, width / 2, height / 2 + 15, 150, 75); // Adjust size as needed
    pop();

}

//making sure it actually works
function drawGameOverThreeTimesScreen() {
    initializeGameOverThreeTimes();
}

//resetting it
function resetGameThreeTimes() {
    gameOverCount = 0; // Reset loss counter back to zero
    resetGame(); // Reuse existing reset function
}
