# Really annoying rock paper scissor

Current Option: 

- Overly Complicated Backgammon   

Backgammon Variation Options:

- The Bully
- The Leaning Tower of Pisa
- Drunk Dice
- The Moody
- Hurricane


- The Bully/The Moody (Combined two ideas)
    - Capture
        - When a piece is about to be captured, the dice will be rolled, one per player
        - if the player who is capturing has the higher score, he may capture, otherwise, no.
        - if the player who is about to be captured has the higher score, he has successfully intimidated the capturer
        - A text box for both players appears, with text corresponding to the number rolled on the dice.
            - Use chatgpt api to randomly generate insults? A higher number will result in a more offensive insult
            - I can just have a text box appear and the players can write something in for fun (no effect on the game)
            - An equal dice result will simply trigger a text animation of generic (pre-written by me) insults for a set amount of time from both players before re-rolling the dice. 
    - Emotions 
        - Pieces can be in one of two states.
            - Depressive
            - Manic
        - The roles are distributed in equal number at the start of the game, and the two roles will visually look a little different. 
            - Depressive
                - Pieces that are assigned the depressive attribute will randomly decide not to move.
                    - Probablility attached to the act of the user clicking the piece or being captured, not time based. 
                - The player must choose another piece.
            - Manic
                - Pieces that are manic will randomly decide to move an extra spot.
    - Effect on capture
        - If piece being captured is in a depressive episode, the ability to fend off the attack will not be triggered, they will simply be captured. 
        - If the piece being captured is in a manic episode, the ability to fend off the attack will not be triggered if they are able to move over by one spot, else it will be triggered. 


- The Leaning Tower of Pisa
    - Stacking
        - Normal game, until players start stacking their pieces
        - Backwards movement enabled (reasoning explained later)
        - Game pieces out of the game will be displayed visually on the board's middle bounds
        - As it is meant to represent a vertical tower, a counter will be displayed on top of the visual.
    - Falling
        - If the number of pieces out of the game per player exceeds 5, the stack will fall.
        - Reliant on sound effects to communicate the falling pieces
        - The pieces will be randomly scattered in the middle of the board.
            - Distance from randomized pieces to the nearest spot is the sum of a random number of pieces
            - Will be positioned directly above a spot, but not in it.
            - Backwards movement is enabled to allow players to go retrieve their pieces.
            - They must stack their pieces (another tower) in the spot nearest to the token they wish to pick up to reach it.
            - Visually one circle in front of the next, not vertical tower like before.
            - Once the piece is retrieved (Collision with top piece of tower, sum of game pieces stacked matches distance), only then may it be moved as a normal piece.
    - Winning
        - Tower can only fall once, so when the players have retrieved their pieces, the game continues as usual.
        - Unless I make them keep falling, at which point there is no end and the only way to win is for one player to forefit out of boredom or frustration.


- Drunk Dice (might be too complicated?)
    - Completely randomized dice behaviour
        - Seperate game states?
        - Everytime the user finishes a move, they click a button, and it re-initializes the game at the current position but with a new dice mechanic (state)?
    - The options are as follows:
        - Double Double
            - Keeps rolling doubles, If they do not win before rolling 4 doubles in a row, they will lose.
        - Randomly rolls off the board
            - Causes the player to forefeit their turn and passes it to the opponent.
        - Waaaaay too many dice
            - Randomly spawns a number of dice between 5 and 10
        - :) and :(
            - :) is a free turn, the player can move however they like, whatever number up to 12
            - :( is a free extra turn to their opponent
        - Normal dice
        - Negative dice
            - Will roll one positive and one negative number
            - Player may be required to move backwards if the negative number is larger than the positive one


- Hurricane
    - A series of natural disasters that mess up the game
    - Triggered on a time basis? 
        - Flood
            - Entire board gets pushed and squished in one direction 
        - Earthquake
            - Entire board is re-shuffled
        - Meteor Attack
            - Random location gets "cratered" and all pieces in the area are destroyed
            - Can be detrimental if they lose integral pieces, or beneficial because they have less pieces to deal with.
        - Zero-G
            - Flips the board around, the opponent's side is now your side
    


Basic pseudocode (JUST STARTED)

- Board
    - Draw board
       - Divide board into 12 (To make width calc easier, width points would be something like ex. width/12*3) 
    - Draw triangles
        - If even number = white
        - Else = grey
    - Draw border
    - Draw central line

- Dice

    - make array to store numbers []
    - Value 1 & Value 2
    - Double = false

    - function rollDice
        - randomly generate a number between 1 and 6
            - dice.value1 = random(1, 6)
            - dice.value2 = random(1, 6)
        - If value 1 === value 2, then double = true
            - if double === true, run double function to deal with it
        - else available moves = [dice.value1, dice.value2, dice.value1 + dice.value2]


OTHER IDEAS:

Rock Paper Scissors:

- Sharing is caring

    - if the same move is selected
    - one point each
    - rock
        - Fist bump animation
    - scissor
        - selfie animation
    - paper
        - hand shake animation
    - allumette
        - both burn, skeleton animation

- DVD screen
    - Somewhat like agar.io
    - Click the icon to spawn the desired item on the game board
    - can spawn as many as you want
    - randomly appears on the board
    - Move randomly and collide with the borders (change direction)
    - Collisions with opponent's pieces, if win, get bigger
    - each growth increment = lives/health bar
        - Getting smaller with each life lost

- Randomly changes choice 
    - literally the normal game, but randomly switches choice, to flip odds.
    - Random choice other than regulars: Middle finger
        - Forefeit the game
    - Random choice other than regulars: Randomly elongates finger
        - turns into fencing mini-game

- Switcharoo
    - paper is the strongest - crush rock and scissor
        - paper is randomly cast iron pan, steel sheet, etc.
    - rock is the weakest - just bounces...
    - scissor is the middle - cuts rock, loses against paper
        - chopsticks, fork, etc...

- Overly complicated rock paper scissors
    - Gun
        - TARGETS ROCK, FIRES, OUTCLASSES SCISSORS, SHOOTS HUMAN & WOLF.
    - devil
        - HURLS ROCK, BREATHS FIRE, IMMUNE TO SCISSORS & GUN, POSSESSES HUMAN.
    - water
        - DROWNS DEVIL, ERODES ROCK, PUTS OUT FIRE, RUSTS SCISSORS & GUN.
    - air
        - BLOWS OUT FIRE, ERODES ROCK, EVAPORATES WATER, CHOKES DEVIL, TARNISHES GUN.
    - paper
        - FANS AIR, COVERS ROCK, FLOATS ON WATER, REBUKES DEVIL, OUTLAWS GUN.
    - sponge
        - SOAKS PAPER, USES AIR POCKETS, ABSORBS WATER, CLEANSES DEVIL, CLEANS GUN.
    - wolf
        - CHEWS UP SPONGE, & PAPER, BREATHES AIR, DRINKS WATER, BITES DEVIL's HEINY.
    - human
        - TAMES WOLF, CLEANS WITH SPONGE, WRITES PAPER, BREATHES AIR, DRINKS WATER.
    - scissors
        - SWISH THROUGH AIR, CUT PAPER, HUMAN, WOLF & SPONGE.
    - fire
        - MELTS SCISSORS, BURNS PAPER, HUMAN, WOLF & SPONGE.
    - rock
        - POUNDS OUT FIRE, CRUSHES SCISSORS, HUMAN, WOLF & SPONGE.

CONNECT 4 - Ideas

- Pre-filled board
- Switching players
- Gravity flip, rotate board
- Bug randomly eats pieces
- Infinity connect 4
- Randomly explode board
- An invisible board
- lights on or off
- A piece refusing to drop because it's scared of heights

0, 50, 100, 150, 200, 250, 300, 350