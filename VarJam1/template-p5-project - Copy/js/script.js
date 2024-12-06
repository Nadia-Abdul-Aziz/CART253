let titleImage;

//Current state
let currentGameState = gameStates.title;

function preload() {
    titleImage = loadImage('assets/images/Pic1.jpg');
}

function setup() {
    createCanvas(600, 400)
    background(255);
}

function draw() {
    drawBorder();
    image(titleImage, 3, 3, 400, height);
    drawRect();
    drawTitle();
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

// function createButtons() {
//     let buttonClock = createButton('Clock Attack');
//     buttonClock.position(850, 250);
//     buttonClock.size(100, 30);
//     buttonClock.mousePressed(() => {
//         currentGameState = gameStates.clockAttack;
//     });

//     let buttonDrowning = createButton('Drown');
//     buttonDrowning.position(850, 300);
//     buttonDrowning.size(100, 30);
//     buttonDrowning.mousePressed(() => {
//         currentGameState = gameStates.drowning;
//     });

//     let buttonPippin = createButton('The Professor');
//     buttonPippin.position(850, 350);
//     buttonPippin.size(100, 30);
//     buttonPippin.mousePressed(() => {
//         currentGameState = gameStates.pippinBarr;
//     });

//     let buttonRoulette = createButton('Bed Roulette');
//     buttonRoulette.position(850, 400);
//     buttonRoulette.size(100, 30);
//     buttonRoulette.mousePressed(() => {
//         currentGameState = gameStates.roulette;
//     });
// }
