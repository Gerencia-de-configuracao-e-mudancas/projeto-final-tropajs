const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
class Personagem {
    constructor({ position, velocity, keys }) {
        this.position = position;
        this.velocity = velocity;
        this.keys = keys;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = "../img/sprites/jotaroStopped.gif";
        this.lastKey;
        this.isAttacking;
        this.canMove = true;
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.speed = 10;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Ataque 
        if (this.isAttacking) {
            c.fillStyle = 'green';
            c.fillRect(this.attackBox.position.x,this.attackBox.position.y, this.attackBox.width, this.attackBox.height )
    
        }

    }

    update() {
        this.draw();
        this.movement();
        colision();

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }

    movement() {
        this.velocity.x = 0;
        if (this.canMove) {
            if (this.keys.a.pressed && this.lastKey == 'a') {
            this.velocity.x = -this.speed;
        } else if (this.keys.d.pressed && this.lastKey == 'd') {
            this.velocity.x = this.speed;
        }
        }
        
    }

    attack() {
        this.isAttacking = true;
        this.canMove = false;
        setTimeout(() => {
            this.isAttacking = false; 
            this.canMove = true;   
        }, 1000);
    }

    
}

function colision() {

        if (showColision(player, enemy) && player.isAttacking) {
             console.log('acertou');
        } 
}

function showColision(player1, player2) {
    let p1Hitbox = player1.attackBox.position.x + player1.attackBox.width;
    let p2Hitbox = player2.position.x + player2.width;
    return (p1Hitbox >= player2.position.x && player1.position.x <= p2Hitbox)
}

const player = new Personagem({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    keys: {
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        space: {
            pressed: false
        }
    }
});

const enemy = new Personagem({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    keys: {
        a: {
            pressed: false
        },
        d: {
            pressed: false
        }
    }
});



function movement(e, isKeyDown) {
    switch (e.key) {
        case "d":
            player.keys.d.pressed = (isKeyDown) ? true : false;
            if (isKeyDown) player.lastKey = 'd';
            break;
        case "a":
            player.keys.a.pressed = (isKeyDown) ? true : false;
            if (isKeyDown) player.lastKey = 'a';
            break;
        case " ": 
            player.keys.space.pressed = (isKeyDown) ? true : false;
            player.attack();
            break;
    }
}

window.addEventListener("keydown", (e) => {
    movement(e, true);
});

window.addEventListener("keyup", (e) => {
    movement(e, false);
});


function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();


}

animate();
console.log(player);