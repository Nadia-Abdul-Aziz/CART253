/**
 * The Mother - The Final Boss
 * 
 * Nadia Abdul Aziz
 * 
 * The last of four games based on space invaders. The player must defeat the boss before the clocks reach them, or destroy the clocks to prevent them from moving down. 
 * Face the wrath of your angry mother trying to get you out of bed and hopefully make her give up and leave you alone.  
 * 
 * Instructions:
 * - Use the left and right arrow keys to move
 * - press the up arrow key to shoot
 * - Clear alarms to prevent them from moving down!
 * - Wear the boss's health down until they are no more!
 * - don't let your health bar reach zero!
 * 
 * Made with p5
 * https://p5js.org/
 * 
 * Modified the code of MAKE IT STOP, same base code, not very many comments except for the changes made.
 */


// image variables
let playerImg;
let enemyImg;
let bulletImg;
let lossImg;
let winImg;
let bossImg;
let slipperImg;
let angryMotherImg;
let sleepImg;

// Game states
const titleScreen = 'title screen';
const gamePlaying = 'playing';
const gameOver = 'game over';
const gameWon = 'game won';

// Track the current state of the game
let gameState = titleScreen;

//setting other states to false
let gameOverInitialized = false;
let gameWonInitialized = false;

// // Track number of game overs
// let gameOverCount = 0;

//Angry guy
let player = {
    x: 250,
    y: 440,
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

let boss = {
    x: 320,
    y: 0,
    size: 180
};

// Array to store alarm clocks
let enemies = [];
const enemyRows = 50;     // Essentially unlimited, until the boss dies
const enemyCols = 2;     // Number of columns, only two then duplicated later

//combat variables
let bossBullets = []; //array for boss variables
let playerHealth = 100; //health count
let bossHealth = 100; //health count


//Load all images
function preload() {
    playerImg = loadImage('assets/images/face.png');
    enemyImg = loadImage('assets/images/clock.png');
    bulletImg = loadImage('assets/images/pillow.png');
    lossImg = loadImage('assets/images/loss.jpg');
    winImg = loadImage('assets/images/z.png')
    bossImg = loadImage('assets/images/mother.png')
    slipperImg = loadImage('assets/images/slipper.png')
    angryMotherImg = loadImage('assets/images/angryMother.png')
    sleepImg = loadImage('assets/images/sleep.png')
}


function setup() {
    createCanvas(640, 480);
    imageMode(CENTER);
    // Initialize enemies from the top
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100, // left side X cooordinate
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
                x: col * 80 + 400, // right side X coordinate
                y: -60 - row * 60, // Start above the screen
                width: 50,
                height: 45,
                alive: true,
                speed: 0.5
            });
        }
    }
}
// houses switch statement to handle different game states
function draw() {
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
                initializeGameOver();
                gameOverInitialized = true;
            }
            background(255);
            drawBorder();
            drawGameOverScreen();
            break;
        case gameWon:
            if (!gameWonInitialized) {
                initializeGameWon();
                gameWonInitialized = true;
            }
            background(255);
            drawBorder();
            initializeGameWon();
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

//instructions
function drawTitleScreen() {
    textAlign(CENTER, CENTER);

    push();
    // Title
    fill('black');
    textSize(48);
    textStyle(BOLD);
    text('THE MOTHER', width / 2, height * 0.15);
    pop();

    push();
    // subtitle
    fill('red');
    textSize(14);
    textStyle(BOLD);
    text('The Final Boss', width / 2, height * 0.22);
    pop();

    imageMode(CENTER);
    image(bossImg, width / 2, height * 0.35, 70, 60);

    push();
    // Game rules
    textSize(18);
    textStyle(BOLD);
    text('HOW TO PLAY', width / 2, height * 0.5);

    textStyle(NORMAL);
    textSize(14);
    text('1. Use LEFT and RIGHT arrow keys to evade her dreaded slipper!', width / 2, height * 0.6);
    text('2. Press the UP key to fight back!', width / 2, height * 0.65);
    text("3. Resist so hard, your mom thinks it's still the weekend!", width / 2, height * 0.7);
    text("4. Don't forget those godforsaken alarms!", width / 2, height * 0.75);

    fill('red');
    textStyle(BOLD);
    textSize(16);
    text('Press the__SPACEBAR__to begin', width / 2, height * 0.85);

    pop();
}

//All gameplay functions
function updateGame() {
    if (gameState === gamePlaying) {

        drawPlayerBoss();

        movePlayer();

        shootBullet();

        updateEnemy();

        bossShoot();

        bossBulletCollision();
    }

};

//Draws the image for the player and the boss
function drawPlayerBoss() {
    push();

    // Translate the player image to follow input
    translate(player.x + player.width / 2, player.y + player.height / 2);

    // Draw the angry man
    image(playerImg, 0, -70, player.width, player.height);

    pop();

    // Draw the mother
    push();
    translate(boss.x, boss.y);
    imageMode(CENTER);
    image(bossImg, 0, 30, boss.size, boss.size);
    pop();

    // Draw mother bullets
    bossBullets.forEach(bullet => {
        ellipse(bullet.x, bullet.y, 8, 8);
    });

    //drawing the display bars to view health levels
    drawHealthBars();
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
    if (player.cooldown > 0) {
        player.cooldown--;
    }
    // Draw and move bullet
    if (bullet.active) {
        //draw the pillow
        image(bulletImg, bullet.x + bullet.width / 2, bullet.y + bullet.height / 2,
            bullet.width, bullet.height);
        bullet.y -= bullet.speed;

        // Deactivate pillow if it goes off screen
        if (bullet.y < 0 || bullet.y > height) {
            bullet.active = false;
        }
    }
}

//Everything to do with the alarm clocks
function updateEnemy() {
    let enemiesAlive = false;

    //used to contain the change direction logic, i'm leaving only this here just in case
    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemiesAlive = true;
        }
    });

    //Update enemy positions and check for collisions
    enemies.forEach(enemy => {
        if (enemy.alive) {
            // Move enemies vertically
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
            if (enemy.y < player.y && enemy.speed < 0 || enemy.y > player.y && enemy.speed > 0) {
                gameState = gameOver;
            }
        }
    });


    // Check if all enemies are defeated, trigger win screen
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

//corellation between the player's bullets and the boss's health
function bossBulletCollision() {
    // Check if the player's bullet is active
    if (bullet.active) {
        // Calculate boss boundaries accounting for centered image (this was a pain)
        let bossLeft = boss.x - boss.size / 2;
        let bossRight = boss.x + boss.size / 2;
        let bossTop = boss.y - boss.size / 2;
        let bossBottom = boss.y + boss.size / 2;

        // Check for collision between bullet and boss
        if (bullet.x < bossRight &&
            bullet.x + bullet.width > bossLeft &&
            bullet.y < bossBottom &&
            bullet.y + bullet.height > bossTop) {

            // Reduce boss health
            bossHealth -= 10;

            // Deactivate the bullet
            bullet.active = false;

            // Check if boss health has reached zero, trigger the game won state
            if (bossHealth <= 0) {
                gameState = gameWon;
            }
        }
    }
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
        bullet.speed = 7;
        player.cooldown = 15;
    }

    // Restart game when spacebar is pressed during game over state
    if (keyCode === 32 && gameState === gameOver) {
        resetGame();
    }
}


function bossShoot() {
    if (random() < 0.02) { //likelihood to shoot
        // Randomly generate boss bullets within boss's width
        let bulletX = random(boss.x - boss.size / 6, boss.x + boss.size / 6);
        bossBullets.push({
            x: bulletX,
            y: boss.y + boss.size / 4,
            width: 50,  // Add width and height for the image
            height: 30
        });
    }

    //reverse loop through the array?
    for (let i = bossBullets.length - 1; i >= 0; i--) {
        bossBullets[i].y += 7; // Move bullets downward

        // Draw the boss bullet image based on random coordinates found in the array
        image(slipperImg, bossBullets[i].x, bossBullets[i].y,
            bossBullets[i].width, bossBullets[i].height);

        // Check collision between the bullet and the player, rectangular detection box, there was probably a better way.
        if (bossBullets[i].x > player.x &&
            bossBullets[i].x < player.x + player.width &&
            bossBullets[i].y > player.y &&
            bossBullets[i].y < player.y + player.height) {
            //reduce the player's health
            playerHealth -= 10;
            //remove from the array
            bossBullets.splice(i, 1);

            // Check if player health has reached zero, and trigger game over if yes
            if (playerHealth <= 0) {
                gameState = gameOver;
            }
            continue; //skips the loop
        }
        //remove if the bullet moves beyond the screen
        if (bossBullets[i].y > height) {
            bossBullets.splice(i, 1);
        }
    }
}

// Draw health bars for player and boss
// checked a tutorial for help
function drawHealthBars() {
    push();
    textFont('Courier New');
    textSize(14);
    textAlign(CENTER, TOP);

    // Boss health bar, white rect within a black rect.
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(20, 20, 16, 120);
    fill(255);
    noStroke();
    rect(21, 21, 14, 118);
    fill(0);
    // Map boss health to bar height
    rect(21, 21 + map(bossHealth, 100, 0, 0, 118), 14, map(bossHealth, 0, 100, 0, 118));
    text(bossHealth, 28, 145);

    // Player health bar, same thing
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(width - 36, height - 140, 16, 120);
    fill(255);
    noStroke();
    rect(width - 35, height - 139, 14, 118);
    fill(0);
    rect(width - 35, height - 139 + map(playerHealth, 100, 0, 0, 118), 14, map(playerHealth, 0, 100, 0, 118));
    text(playerHealth, width - 28, height - 160);
    pop();
}

function initializeGameOver() {
    let gameOverText = "Game Over!"; // Defined variable for game over text

    textAlign(CENTER, CENTER);
    push();

    // Display loss
    fill('black');
    textStyle(BOLD);
    textSize(24);
    text(gameOverText, width / 2, height / 2 - 100);
    pop();

    // image
    push();
    imageMode(CENTER);
    image(angryMotherImg, width / 2, height / 2, 110, 100);
    pop();

    push();
    // Button text
    fill('red');
    textStyle(BOLD);
    textSize(14);
    text('Press the __SPACEBAR__ to restart', width / 2, height / 2 + 100);
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
    player.x = 250;
    player.y = 440;
    player.cooldown = 0;
    player.width = 150;
    player.height = 150;

    // Reset bullet
    bullet.active = false;
    bullet.width = 50;
    bullet.height = 50;

    // Recreate both enemy grids
    enemies = [];
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100, //left
                y: -60 - row * 60,
                width: 50,
                height: 45,
                alive: true,
                speed: 0.4
            });
        }
    }
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 400, //right
                y: -60 - row * 60,
                width: 50,
                height: 45,
                alive: true,
                speed: 0.4
            });
        }
    }

    // Remove any existing UI elements from previous game state
    removeElements();
    bossHealth = 100; // Reset boss health
    playerHealth = 100; //reset player health
}

function initializeGameWon() {
    let gameWonText = "Sleep mode: Eternal"; // Defined variable for game won text

    let gameWonSubtitle = "Waking life is a myth"; // Defined variable for subtitle

    textAlign(CENTER, CENTER);

    push();
    // Display win
    fill('black');
    textStyle(BOLD);
    textSize(24);
    text(gameWonText, width / 2, height / 2 - 110);
    pop();

    push();
    // Display the subtitle under the title
    fill('black');
    textSize(14);
    text(gameWonSubtitle, width / 2, height / 2 - 80);
    pop();

    push();
    imageMode(CENTER);
    image(sleepImg, width / 2, height / 2, 300, 100); // Adjust size as needed
    pop();
}
