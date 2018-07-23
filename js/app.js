// Enemies our player must avoid.
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images.
        this.sprite = 'images/enemy-bug.png';
    }

    // Draws the enemy on the screen.
    render() {
        return ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
        return this.dt;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-boy.png';
    }

    // Updates the Player's position.
    update(dt) {
        return this.dt;
    }

    // Draws the Player character image.
    render() {
        return ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }

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
            setTimeout(function() {
                player.x = 202;
                player.y = 405;
            }, 300);
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
const allEnemies = [];

// Create Enemies.
const enemyLocation = [65, 150, 230];

enemyLocation.forEach(function(positionY) {
    const enemy = new Enemy(0, positionY, 500000);
    allEnemies.push(enemy);
});

// Places the player object in a variable called player.
const player = new Player(202, 405);

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
