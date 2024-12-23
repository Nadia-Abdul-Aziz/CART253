/**
 * Clock Attack
 * 
 * Nadia Abdul Aziz
 * 
 * The first of four games based on space invaders. This is the closest to the original game, rather a simplified version.
 * Your many alarms are attempting to get you out of bed on a dreaded monday morning, destroy all the alarms!
 * 
 * Instructions:
 * - Use the arrow keys to move
 * - Use the up arrow to shoot pillows
 * - Get rid of all the clocks before they reach the player
 * 
 * Made with p5
 * https://p5js.org/
 */


// image variables
let playerImg;
let enemyImg;
let bulletImg;
let lossImg;
let winImg;

// Game states
const titleScreen = 'title screen';
const gamePlaying = 'playing';
const gameOver = 'game over';
const gameWon = 'game won';

// Track the current state of the game
let gameState = titleScreen;

//setting other two states to false
//I did this earlier but I can just remove this and change how they're called now that I have my title screen...but eh, I'm lazy.
let gameOverInitialized = false;
let gameWonInitialized = false;

//Angry guy
let player = {
    x: 320,
    y: 430,
    width: 150,
    height: 150,
    speed: 5,
    cooldown: 0  // Cooldown timer between shots
};

// the pillows
let bullet = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    active: false, //not currently being thrown
    speed: 7
};

// Array to store alarm clocks
//Essentially just dissapears under the background overlay
//Should this be an object?
let enemies = [];
const enemyRows = 3;     // Number of rows
const enemyCols = 6;     // Number of columns
let enemyDirection = 1;   // Direction of movement (1 for right, -1 for left)


//Load all images
function preload() {
    playerImg = loadImage('assets/images/face.png');
    enemyImg = loadImage('assets/images/clock.png');
    bulletImg = loadImage('assets/images/pillow.png');
    lossImg = loadImage('assets/images/loss.jpg');
    winImg = loadImage('assets/images/z.png')
}


function setup() {
    createCanvas(640, 480);
    imageMode(CENTER);
    // Initialize enemies in a grid formation
    // Could have also used a while loop
    // Wouldn't run as its own function
    // So I discovered the ++ thing, basically x + 1, one of the tutorials did this
    // Outer loop iterates the rows and the inner one iterates through the columns
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100,
                //spreading them horizontally, 80 pixels apart + offset of 100 from the edge
                y: row * 60 + 50,
                //vertical
                width: 50,
                height: 45,
                alive: true //Initial state of not yet shot at
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
            // Clear the background with white, hiding the previous array generations because I have no idea how to get rid of them. 
            background(255);
            drawBorder();
            updateGame();
            //Contains all the actual game functions
            break;
        case gameOver:
            // ! means only run if it isn't already running, same as === false
            if (!gameOverInitialized) {
                initializeGameOver();
                gameOverInitialized = true;
            }
            //Added this to prevent drawing the game elements during game over
            background(255); //white background
            drawBorder();
            drawGameOverScreen(); //had trouble getting it to actually draw so I'm calling initgameover a second time here.
            break;
        case gameWon:
            if (!gameWonInitialized) {
                initializeGameWon();
                gameWonInitialized = true;
                //Winning screen, prompt to go back home
            }
            background(255); // Added background clear for gameWon state
            drawBorder();
            initializeGameWon(); // Redraw the win screen every frame
            break;
    }
    // Show/hide the hyperlink based on gameState
    let homeLink = document.getElementById('homeLink');
    if (gameState === gameWon) {
        homeLink.style.display = 'block';
    } else {
        homeLink.style.display = 'none';
    }
}

//Drawing outer border. 
function drawBorder() {
    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(5);
    rect(0, 0, width, height);
    pop();
}
function drawTitleScreen() {
    textAlign(CENTER, CENTER);

    push();
    // Title
    fill('black');
    textSize(48);
    textStyle(BOLD);
    text('CLOCK ATTACK', width / 2, height * 0.15);
    pop();

    imageMode(CENTER);
    image(enemyImg, width / 2, height * 0.32, 70, 70); // Adjust size as needed

    push();
    // Game rules
    textSize(18);
    textStyle(BOLD);
    text('HOW TO PLAY', width / 2, height * 0.5);
    pop();

    push();
    textStyle(NORMAL);
    textSize(14);
    text('1. Use LEFT and RIGHT arrow keys to march against the slumber destroyers!', width / 2, height * 0.6);
    text('2. Press the UP key to yeet pillows at your alarms!', width / 2, height * 0.65);
    text('3. Obliterate all clocks before they turn you into a functional adult', width / 2, height * 0.7);
    pop();

    push();
    fill('red');
    textStyle(BOLD);
    textSize(16);
    text('Press the__SPACEBAR__to begin', width / 2, height * 0.85);
    pop();
}

//All gameplay functions
function updateGame() {
    //had a bug, fixed it but leaving this here in case I need it again.
    // console.log(player.x);
    // console.log(player.y);
    // console.log(bullet.active);

    //only draw if the state is playing, fixing bug to only draw during playing state issue
    if (gameState === gamePlaying) {

        drawPlayer();

        movePlayer();

        shootBullet();

        updateEnemy();
    }

};

//Draws the image for the player
function drawPlayer() {
    push();

    // Translate the player image to follow input
    translate(player.x + player.width / 2, player.y + player.height / 2);

    // Draw the angry man
    image(playerImg, 0, -70, player.width, player.height);

    pop();
};

//Handles keyboard input to move the angry man
function movePlayer() {

    //Moving when left and right key is pressed and constraining to canvas bounds
    if (keyIsDown(LEFT_ARROW) && player.x > 0) {
        player.x -= player.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && player.x < width - player.width) {
        player.x += player.speed;
    }

}

//Anything to do with flinging the pillows at the clocks
function shootBullet() {
    //set to zero when the game starts already so this is a bit redundant, but I'll keep it anyway. 
    if (player.cooldown > 0) {
        player.cooldown--; //player can only shoot once it reaches zero, decrement
    }
    // Draw and move bullet
    if (bullet.active) {
        //draw the pillow
        image(bulletImg, bullet.x + bullet.width / 2, bullet.y + bullet.height / 2,
            bullet.width, bullet.height);
        bullet.y -= bullet.speed;  // Move bullet upwards

        // Deactivate pillow if it goes off screen
        if (bullet.y < 0) {
            bullet.active = false;
        }
    }
}

//Everything to do with the alarm clocks
function updateEnemy() {

    //variables
    let moveDown = false;
    let enemiesAlive = false;

    // Check if enemies need to change direction
    // forEach iterates through the array, was the most efficient way I found.
    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemiesAlive = true;
            // Check if enemies have hit canvas bounds
            if ((enemy.x + enemy.width > width && enemyDirection > 0) ||
                (enemy.x < 0 && enemyDirection < 0)) {
                //if yes, then move, see next part
                moveDown = true;
            }
        }
    });

    //Update enemy positions and check for collisions
    enemies.forEach(enemy => {
        if (enemy.alive) {
            // Move enemies down if they hit screen edge
            if (moveDown) {
                enemy.y += 20;
            }
            // Move enemies horizontally
            enemy.x += enemyDirection * 2;

            // Draw the actual clock
            image(enemyImg, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2,
                enemy.width, enemy.height);

            // Check for bullet collision, set to dead
            if (bullet.active && collision(bullet, enemy)) {
                enemy.alive = false;
                bullet.active = false;
            }

            // Check if enemies have reached the player's line
            if (enemy.y + enemy.height > player.y) {
                gameState = gameOver;
            }
        }
    });

    // Change enemy direction if they hit screen edges
    if (moveDown) {
        enemyDirection *= -1;
    }

    // Check if all enemies are defeated, trigger win screen
    if (!enemiesAlive) {
        gameState = gameWon;
    }
}

// Check collision between two variables
//Consulted collison tutorials
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

    // Create a new bullet when spacebar is pressed
    // When the player shoots the cooldown begins at 15 and decreases
    //makes sure there isn't already a bullet on screen, no double fire.
    if (keyCode === (UP_ARROW) && !bullet.active && player.cooldown === 0) { // Space bar key
        bullet.active = true;
        // Calculating the location of the player
        bullet.x = player.x + player.width / 2 - bullet.width / 2;
        bullet.y = player.y;
        // Set cooldown between shots
        player.cooldown = 15;
    }

    // Restart game when spacebar is pressed during game over state
    if (keyCode === 32 && gameState === gameOver) {
        resetGame();
    }
}

function initializeGameOver() {

    //could also just write this as a string I suppose
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

    // Reset player position and cooldown
    player.x = 320;
    player.y = 430;
    player.cooldown = 0;
    player.width = 150; // Reset player width
    player.height = 150; // Reset player height

    // Reset bullet
    bullet.active = false;
    bullet.width = 50; // Reset bullet width
    bullet.height = 50; // Reset bullet height

    // Recreate enemy grid
    enemies = [];
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100,
                y: row * 60 + 50,
                width: 50, // Reset enemy width
                height: 45, // Reset enemy height
                alive: true
            });
        }
    }

    // Reset enemy movement direction
    enemyDirection = 1;

    removeElements();
}

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
