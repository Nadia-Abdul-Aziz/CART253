let titleImage;

//Assigning the states to the game text in the title screen
const gameMenu = {
    clockAttack: {
        name: 'Clock Attack',
        state: gameStates.clockAttack,
        y: 150
    },
    drowning: {
        name: 'Drowning in my Tears',
        state: gameStates.drowning,
        y: 200
    },
    pippinBarr: {
        name: 'The Professor',
        state: gameStates.pippinBarr,
        y: 250
    },
    roulette: {
        name: 'Russian Roulette',
        state: gameStates.roulette,
        y: 300
    }
};

//Current state
let currentGameState = gameStates.title;

function preload() {
    titleImage = loadImage('assets/images/Pic1.jpg');
}

function setup() {
    createCanvas(600, 400)
    background(255);

    // Create buttons only on title screen
    if (currentGameState === gameStates.title) {
        createButtons();
    }

    // Setup individual game states
    if (currentGameState === gameStates.clockAttack) {
        clockAttackSetup();
    }
}

function draw() {
    drawBorder();
    switch (currentGameState) {
        case gameStates.title:
            image(titleImage, 3, 3, 400, height);
            drawRect();
            drawTitle();
            break;
        case gameStates.clockAttack:

            break;
        case gameStates.drowning:
            drawDrowning();
            break;
        case gameStates.pippinBarr:
            drawPippinBarr();
            break;
        case gameStates.roulette:
            drawRoulette();
            break;
    }
}

function drawBorder() {
    push();
    stroke(255, 0, 0);
    strokeWeight(4);
    noFill();
    rect(0, 0, width, height);
    pop();
}

function drawRect() {
    push();
    fill('black');
    rect(400, 325, 500, 80);
    pop();
}

function drawTitle() {
    push();
    textSize(25);
    textStyle(BOLD);
    text('SLEEP INVADERS', 350, 50);
    pop();

    push();
    textSize(15);
    text('Choose your fight', 455, 80);
    text('against wakefulness', 440, 100);
    pop();
}

function createButtons() {
    let buttonClock = createButton('Clock Attack');
    buttonClock.position(850, 250);
    buttonClock.size(100, 30);
    buttonClock.mousePressed(() => {
        currentGameState = gameStates.clockAttack;
    });

    let buttonDrowning = createButton('Drown');
    buttonDrowning.position(850, 300);
    buttonDrowning.size(100, 30);
    buttonDrowning.mousePressed(() => {
        currentGameState = gameStates.drowning;
    });

    let buttonPippin = createButton('The Professor');
    buttonPippin.position(850, 350);
    buttonPippin.size(100, 30);
    buttonPippin.mousePressed(() => {
        currentGameState = gameStates.pippinBarr;
    });

    let buttonRoulette = createButton('Bed Roulette');
    buttonRoulette.position(850, 400);
    buttonRoulette.size(100, 30);
    buttonRoulette.mousePressed(() => {
        currentGameState = gameStates.roulette;
    });
}
