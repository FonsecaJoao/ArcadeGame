'use strict';

class Character {
    constructor(x, y, sprite, speed) {
        this.x = x;
        this.y = y;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images.
        this.sprite = sprite;
        this.speed = speed;
    }

    // Draws the enemy on the screen.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid.
class Enemy extends Character {
    constructor(x, y, sprite, speed) {
        super(x, y, sprite, speed);
     }

    // Updates the enemy's position.
    // Parameter: dt, a time delta between ticks.
    update(dt) {
        // Multiply any movement by the dt parameter which will ensure the game
        // runs at the same speed for all computers.
        this.x += this.speed * dt;

        // if Enemy.x is bigger than 510 turns it to -100 so the animation of
        // leaving the screen and reappering its smooth.
        if (this.x > 510) {
            this.x = -100;
            // Enemy.speed is randomize.
            this.speed = 100 + Math.floor(Math.random() * 333);
        }
        // Uses Axis-Aligned Bounding Box to detect collision.
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {
            resetPlayer();
        }

    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(x, y, sprite) {
        super(x, y, sprite);
    }

    // Updates the Player's position.
    update(dt) {}

    // Handles how Player moves in canvas, prevents it from going off screen
    // and if Player reaches the top of the canvas it wins the game and a modal
    // will show.
    handleInput(keyUp) {
        if (keyUp === 'left' && this.x > 0) {
            this.x -= 102;
        }
        if (keyUp === 'right' && this.x < 405) {
            this.x += 102;
        }
        if (keyUp === 'up' && this.y > 0) {
            this.y -= 83;
        }
        if (keyUp === 'down' && this.y < 405) {
            this.y += 83;
        }
        if (this.y < 0) {
            setTimeout( () => { resetPlayer(); }, 300);
            $('#myModal').modal('show');
        }
        return this.keyUp;
    }
}

// Resets Player position
function resetPlayer() {
    player.x = 202;
    player.y = 405;
}

// Instantiate objects.
// Places all enemy objects in an array called allEnemies.
let allEnemies = [];

// Create Enemies.
const enemyLocation = [65, 150, 230];

enemyLocation.forEach(function(positionY) {
    let enemy = new Enemy(0, positionY, 'images/enemy-bug.png', 500000);
    allEnemies.push(enemy);
});

// Places the player object in a variable called player.
const player = new Player(202, 405, 'images/char-boy.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
