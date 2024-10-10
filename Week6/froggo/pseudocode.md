# Pseudo for froggo
frog
    body
        x 320 (halfway of canvas) or width/2
        y 480 (bottom of canvas)
        size 100 (diameter)
    tongue
        x undefined (match the body)
        y 480 (draw behind frog)
        size 20
        speed 20
        state idle (if not launched)

fly
    x 0 (left)
    y 200? random
    size 10?(small)
    speed 3 (how fast)

setup()
    640x480 canvas 

draw()
    backgrounmd
    frog
    fly
    tongue
    movefrog
    movefly
    movetongue
    check tongue fly overlap

movefly()

add fly speed to fly x

if (fly x is past right side of canvas, move back to left) give fly random y

drawfly()
    draw black circle at position with size

movefrog
    set frog x to mousex

movetongue()

    set tongue x to frog x
    if idle do nothing
    else if clicked move tongue by speed

    if tongue bit top
    set tongue state to inbound
    else if tongue is inboind moce down by speed
    if tongue hit bottom, set sate to idle

draw(frog)
    draw curcle body
    draw red line between circles
    craw circle at tongue positin

check overlap()

    if tongue overlaps over fly
        move fly back to random y
        set state to inbound

mousepressed()
    if tongue is idle
    set position to outbound
