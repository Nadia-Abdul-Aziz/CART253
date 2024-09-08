/**
 * Moon Cult
 * Nadia Abdul Aziz
 * 
 * Practicing more functions within draw, accidentally created a cult emblem
 * 
 */

"use strict";

/**
 * Creates the canvas, square, standard rez
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * Displays the ellipses that make up the piece
*/
function draw() {
    //Change color to hue, sat and brightness
    colorMode(HSB);
    //dark blue
    background(250, 100, 50);
    //switching back to rgb in master project (whole project)
    colorMode(RGB);

    // Outermost ring
    push();
    //transparent
    fill(50, 0.0);
    //white border
    stroke(255);
    //circle in center
    ellipse(320, 320, 500);
    pop();

    // largest white circle
    push();
    //white color
    fill('white');
    //no border
    noStroke();
    //circle
    ellipse(320, 320, 300);
    pop();

    // Inner white circle (with blue outline)
    push();
    fill(50, 0.0);
    //change color to hue, sat, bright
    colorMode(HSB);
    //dark blue border
    stroke(250, 100, 50);
    ellipse(320, 320, 200);
    pop()

    // smallest blue circle (functions as background for moon design)
    push();
    colorMode(HSB);
    //dark blue color
    fill(250, 100, 50);
    ellipse(320, 320, 100);
    pop();

    // Shading for corner ring
    push();
    colorMode(HSB);
    fill(250, 100, 50);
    //thickenned border to 7px
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

    //corner frame for moon
    push();
    colorMode(HSB);
    fill(50, 0.0);
    stroke(255);
    strokeWeight(7);
    ellipse(450, 220, 70);
    pop();

    //corner circle to create moon shape
    push();
    noStroke();
    fill('white');
    ellipse(440, 215, 55);
    pop();

   //corner accents to frame the piece
    push();
    fill(50, 0.0);
    stroke('white');
    strokeWeight(7);
    ellipse(320, 320, 800)
    pop();
}