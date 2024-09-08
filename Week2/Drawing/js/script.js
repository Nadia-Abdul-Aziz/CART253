/**
 * Drawing
 * Nadia Abdul Aziz
 * 
 * Practicing more functions within draw
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    colorMode(HSB);
    background(250, 100, 50);
    colorMode(RGB);

    // Outermost ring
    push();
    fill(50, 0.0);
    stroke(255);
    ellipse(320, 320, 500);
    pop();

    // largest white circle
    push();
    fill('white');
    noStroke();
    ellipse(320, 320, 300);
    pop();

    // Inner white circle (with blue outline)
    push();
    fill(50, 0.0);
    colorMode(HSB);
    stroke(250, 100, 50);
    ellipse(320, 320, 200);
    pop()

    // smallest blue circle (functions as background for moon design)
    push();
    colorMode(HSB);
    fill(250, 100, 50);
    ellipse(320, 320, 100);
    pop();

    // Shading for corner ring
    push();
    colorMode(HSB);
    fill(250, 100, 50);
    strokeWeight(7);
    stroke(250, 100, 50);
    ellipse(450, 220, 100);
    pop();
    
    // Corner ring 
    push();
    colorMode(HSB);
    fill(250, 100, 50);
    strokeWeight(2.5);
    stroke('white');
    ellipse(450, 220, 100);
    pop();

    push();
    fill(50, 0.0);
    stroke(255);
    ellipse(450, 220, 88);
    pop();

    // Innermost white circle (cut by blue circle to create moon shape)
    push();
    noStroke();
    fill(255);
    ellipse(320, 320, 60);
    pop();

    //Innermost blue circle (to cut through the white circle)
    push();
    colorMode(HSB);
    noStroke();
    fill(250, 100, 50);
    ellipse(310, 315, 60);
    pop();

    // Outer frame for moon
    push();
    fill(50, 0.0);
    stroke(255);
    strokeWeight(2);
    ellipse(320, 320, 90);
    pop();

    // Inner frame for moon
    push();
    fill(50, 0.0);
    stroke(255);
    ellipse(320, 320, 80);
    pop();

    push();
    colorMode(HSB);
    fill(50, 0.0);
    stroke(255);
    strokeWeight(7);
    ellipse(450, 220, 70);
    pop();

    push();
    noStroke();
    fill('white');
    ellipse(440, 215, 55);
    pop();

    push();
    fill(50, 0.0);
    stroke('white');
    strokeWeight(7);
    ellipse(320, 320, 800)
    pop();
}