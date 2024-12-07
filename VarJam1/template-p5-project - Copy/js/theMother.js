// image variables
let playerImg;
let enemyImg;
let bulletImg;
let lossImg;
let winImg;
let bossImg;

// Game states
const titleScreen = 'title screen';
const gamePlaying = 'playing';
const gameOver = 'game over';
const gameWon = 'game won';

// Track the current state of the game
let gameState = titleScreen;

//setting other two states to false
let gameOverInitialized = false;
let gameWonInitialized = false;

// Track number of game overs
let gameOverCount = 0;

//Angry guy
let player = {
    x: 250,
    y: 440,
    width: 150,
    height: 150,
    speed: 5,
    cooldown: 0  // Cooldown timer between shots, not sure if this works really
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

let boss = {
    x: 320,
    y: 0,
    size: 180
};

// Array to store alarm clocks
//Essentially just dissapears under the background overlay
//Should this be an object?
let enemies = [];
const enemyRows = 50;     // Essentially unlimited, until the boss dies
const enemyCols = 2;     // Number of columns

//combat variables
let bossBullets = [];
let playerHealth = 100;
let bossHealth = 100;


//Load all images
function preload() {
    playerImg = loadImage('assets/images/face.png');
    enemyImg = loadImage('assets/images/clock.png');
    bulletImg = loadImage('assets/images/pillow.png');
    lossImg = loadImage('assets/images/loss.jpg');
    winImg = loadImage('assets/images/z.png')
    bossImg = loadImage('assets/images/mother.png')
}


function setup() {
    createCanvas(640, 480);
    imageMode(CENTER);
    // Initialize enemies from the top
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 100, // Adjusted x-coordinate calculation
                y: -60 - row * 60, // Start above the screen
                width: 50,
                height: 45,
                alive: true,
                speed: 0.3 // Move downwards
            });
        }
    }
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 400, // Adjusted x-coordinate calculation
                y: -60 - row * 60, // Start above the screen
                width: 50,
                height: 45,
                alive: true,
                speed: 0.3 // Move downwards
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
                gameOverCount++; // Increment loss counter
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

    imageMode(CENTER);
    image(enemyImg, width / 2, height * 0.32, 70, 60); // Adjust size as needed

    // Game rules
    textSize(18);
    textStyle(BOLD);
    text('HOW TO PLAY', width / 2, height * 0.5);

    textStyle(NORMAL);
    textSize(14);
    text('1. Use LEFT and RIGHT arrow keys move!', width / 2, height * 0.6);
    text('2. Press the UP and DOWN arrow keys to shoot!', width / 2, height * 0.65);
    text('3. Smash all clocks before they catch up to you!', width / 2, height * 0.7);

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

        drawPlayerBoss();

        movePlayer();

        shootBullet();

        updateEnemy();

        bossShoot();

        bossBulletCollision();
    }

};

//Draws the image for the player
function drawPlayerBoss() {
    push();

    // Translate the player image to follow input
    translate(player.x + player.width / 2, player.y + player.height / 2);

    // Draw the angry man
    image(playerImg, 0, -70, player.width, player.height);

    pop();

    // Draw Bugzilla
    push();
    translate(boss.x, boss.y);
    imageMode(CENTER);
    image(bossImg, 0, 30, boss.size, boss.size);
    pop();

    // Draw boss bullets
    bossBullets.forEach(bullet => {
        ellipse(bullet.x, bullet.y, 8, 8);
    });

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
            // Move enemies vertically
            enemy.y += enemy.speed; // Move enemies downwards

            // Draw the actual clock
            image(enemyImg, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2,
                enemy.width, enemy.height);

            // Check for bullet collision, set to dead
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
//Consulted collison tutorials
function collision(bullet, enemy) {
    return bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y;
}

function bossBulletCollision() {
    // Check if bullet is active
    if (bullet.active) {
        // Calculate boss boundaries accounting for centered image
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


function bossShoot() {
    if (random() < 0.03) { //likelihood to shoot
        // Randomly generate boss bullets within boss's width
        let bulletX = random(boss.x - boss.size / 6, boss.x + boss.size / 6);
        bossBullets.push({ x: bulletX, y: boss.y + boss.size / 4 });
    }

    for (let i = bossBullets.length - 1; i >= 0; i--) {
        bossBullets[i].y += 7; // Move bullets downward

        // Check collision
        if (bossBullets[i].x > player.x &&
            bossBullets[i].x < player.x + player.width &&
            bossBullets[i].y > player.y &&
            bossBullets[i].y < player.y + player.height) {
            playerHealth -= 10;
            bossBullets.splice(i, 1);
            continue;
        }

        if (bossBullets[i].y > height) {
            bossBullets.splice(i, 1);
        }
    }
}

// Draw health bars for player and boss
function drawHealthBars() {
    push();
    textFont('Courier New');
    textSize(14);
    textAlign(CENTER, TOP);

    // Boss health bar
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(20, 20, 16, 120);
    fill(255);
    noStroke();
    rect(21, 21, 14, 118);
    fill(0);
    // Map boss health to bar height
    //CLAUDE USED FOR LOGIC HELP!!
    rect(21, 21 + map(bossHealth, 100, 0, 0, 118), 14, map(bossHealth, 0, 100, 0, 118));
    text(bossHealth, 28, 145);

    // Player health bar
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

    // let gameOverSubtitle = "The clocks have taken over!"; // Defined variable for game over text


    textAlign(CENTER, CENTER);
    push();

    // Display win
    fill('black');
    textStyle(BOLD);
    textSize(24);
    //Shows specific reasoning for win/loss
    text(gameOverText, width / 2, height / 2 - 100);
    pop();

    push();

    // // Display win
    // fill('black');
    // textSize(15);
    // //Shows specific reasoning for win/loss
    // text(gameOverSubtitle, width / 2, height / 2 - 60);
    // pop();

    // Center the image
    push();
    imageMode(CENTER);
    image(lossImg, width / 2, height / 2, 200, 150); // Adjust size as needed
    pop();

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
    player.x = 250;
    player.y = 440;
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
                y: -60 - row * 60, // Start above the screen
                width: 50, // Reset enemy width
                height: 45, // Reset enemy height
                alive: true,
                speed: 0.2 // Add speed for vertical movement
            });
        }
    }
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: col * 80 + 400, // Adjusted x-coordinate calculation
                y: -60 - row * 60, // Start above the screen
                width: 50,
                height: 45,
                alive: true,
                speed: 0.2 // Move downwards
            });
        }
    }

    // Remove any existing UI elements from previous game state
    removeElements();
    bossHealth = 100; // Reset boss health
}

function initializeGameWon() {
    let gameWonText = "You Win!"; // Defined variable for game over text

    // let gameWonSubtitle = "You defeated the clocks!"; // Defined variable for game over text


    textAlign(CENTER, CENTER);
    push();

    // Display win
    fill('black');
    textStyle(BOLD);
    textSize(24);
    //Shows specific reasoning for win/loss
    text(gameWonText, width / 2, height / 2 - 90);
    pop();

    push();

    // // Display win
    // fill('black');
    // textSize(15);
    // //Shows specific reasoning for win/loss
    // text(gameWonSubtitle, width / 2, height / 2 - 30);
    // pop();

    push();
    imageMode(CENTER);
    image(winImg, width / 2, height / 2, 200, 100); // Adjust size as needed
}
