/**
 * FrontGammon
 * Nadis Abdul Aziz
 * 
 * Backgammon but it's a piss off
 * Variation 1
 * Variation 2
 * Variation 3
 */


//Variables for triangle loop

let tri = {
    //X values
    x1: 0,
    x2: 50,
    //Bottom y values
    y1: 400,
    y2: 400,
    //top y values
    topY1: 0,
    topY2: 0,
    //middle point
    hX: 25,
    hY: 250,
    topHY: 300,

}

//rotation variables for keypressed
let rotationX = 0;
let rotationY = 0;

// let dice = {
//     value1: random(1, 6),
//     value2: random(1, 6),
// };

function setup() {
    createCanvas(600, 400, WEBGL);
}

function draw() {
    drawBackground();
    drawTriangles();
    drawDice1();
    drawDice2();
    keypressed();
}

function drawBackground() {
    background(255, 0, 0);
    // fill(235, 228, 195);
    // rectMode(CENTER);
    // rect(300, 200, 550, 350)
};

function drawTriangles() {
    fill(0, 0, 0);

    // Convert canvas width to coordinate system in WEBGL
    let canvasWidth = width / 2;

    //Loop for drawing triangles (bottom)
    let triBottom = { ...tri };
    while (triBottom.x2 <= canvasWidth * 2) {
        triangle(
            triBottom.x1 - canvasWidth, triBottom.y1 - (height / 2),
            triBottom.x2 - canvasWidth, triBottom.y2 - (height / 2),
            triBottom.hX - canvasWidth, triBottom.hY - (height / 2)
        );
        triBottom.x1 += 50;
        triBottom.x2 += 50;
        triBottom.hX += 50;
    }

    //Top triangles
    let triTop = { ...tri };
    while (triTop.x2 <= canvasWidth * 2) {
        triangle(
            triTop.x1 - canvasWidth, triTop.topY1 + (height / 2),
            triTop.x2 - canvasWidth, triTop.topY2 + (height / 2),
            triTop.hX - canvasWidth, triTop.topHY + (height / 2)
        );
        triTop.x1 += 50;
        triTop.x2 += 50;
        triTop.hX += 50;
    }
}

// function drawTriangles() {
//     fill(0, 0, 0);

//     //Loop for drawing triangles (bottom)
//     let triBottom = { ...tri }; //  lazy to refactor rn
//     while (triBottom.x2 <= width) {
//         triangle(triBottom.x1, triBottom.y1, triBottom.x2, triBottom.y2, triBottom.hX, triBottom.hY);
//         triBottom.x1 += 50;
//         triBottom.x2 += 50;
//         triBottom.hX += 50;
//         // if (triBottom.x1 === 50 && triBottom.x2 === 100 || triBottom.x1 === 150 && triBottom.x2 === 200 || triBottom.x1 === 250 && triBottom.x2 === 300 || triBottom.x1 === 350 && triBottom.x2 === 400 || triBottom.x1 === 450 && triBottom.x2 === 500) {
//         //     fill(255, 255, 255);
//         // };
//     }

//     //Top triangles
//     let triTop = { ...tri }; // Create a copy for top triangles
//     while (triTop.x2 <= width) {
//         triangle(triTop.x1, triTop.topY1, triTop.x2, triTop.topY2, triTop.hX, triTop.topHY);
//         triTop.x1 += 50;
//         triTop.x2 += 50;
//         triTop.hX += 50;
//         // if (triTop.x1 === 50 || triTop.x1 === 150 || triTop.x1 === 250 || triTop.x1 === 350 || triTop.x1 === 450) {
//         //     fill(255, 255, 255);
//         // };
//     }
// };

function drawDice1() {
    push();
    fill(255); // Set fill color to white
    stroke(0); // Set stroke color to black
    strokeWeight(2); // Set stroke weight
    //First Die
    translate(-50, 0, 0); // Position the first die
    drawDie(20); // Draw the first die with size 20
    pop();
}

function drawDice2() {
    push();
    fill(255); // Set fill color to white
    stroke(0); // Set stroke color to black
    strokeWeight(2); // Set stroke weight
    translate(100, 0, 0); // Position the second die
    drawDie(20); // Draw the second die with size 20
    pop();
}

function drawDie(size) {
    // Draw cuuuuuuuuuuube
    rotateY(rotationY);
    rotateX(rotationX);
    box(size);
}

function keypressed() {
    if (keyCode === 32) {
        rotationY += 0.2;
        rotationX += 0.2;
    }
}

// function rollDice() {

// };


// - randomly generate a number between 1 and 6
//     - dice.value1 = random(1, 6)
//         - dice.value2 = random(1, 6)
//             - If value 1 === value 2, then double = true
//                 - if double === true, run double function to deal with it
//                 - else available moves = [dice.value1, dice.value2, dice.value1 + dice.value2]

// (triTop.x1 % 100 === 50)
// triTop.x1 === 50 || triTop.x1 === 150 || triTop.x1 === 250 || triTop.x1 === 350 || triTop.x1 === 450
//triBottom.x1 === 50 && triBottom.x2 === 100 || triBottom.x1 === 150 && triBottom.x2 === 200 || triBottom.x1 === 250 && triBottom.x2 === 300

// // Top Left Circles
// fill(145, 145, 144)
// circle(80, 55, 32)
// circle(80, 88, 32)
// circle(80, 121, 32)
// circle(80, 154, 32)
// circle(80, 189, 32)

// // Bottom Left Circles
// fill(240, 132, 132)
// circle(80, 350, 32)
// circle(80, 317, 32)
// circle(80, 284, 32)
// circle(80, 251, 32)
// circle(80, 218, 32)

// // Top Right Circles
// fill(240, 132, 132)
// circle(277, 55, 32)
// circle(277, 88, 32)
// circle(277, 121, 32)

// // Bottom Right Circles 
// fill(145, 145, 144)
// circle(277, 350, 32)
// circle(277, 317, 32)
// circle(277, 284, 32)
