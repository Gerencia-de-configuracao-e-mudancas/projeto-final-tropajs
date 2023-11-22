class Background {
    constructor({position, imgSrc}){
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imgSrc;
    }
    draw() {
        c.drawImage(this.image,this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}

class Personagem {
    constructor({ position, velocity, keys, color, side }) {
        this.position = position;
        this.velocity = velocity;
        this.keys = keys;
        this.color = color;
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
        this.side = side;
        this.life = 100;
        this.canAttack = true;
    }

    draw() {
        if (this.life > 0) {
            c.fillStyle = this.color;
            c.fillRect(this.position.x, this.position.y, this.width, this.height);

        }



        // Ataque 
        if (this.isAttacking) {
            c.fillStyle = 'green';
            this.attackBox.position = { ...this.position };
            this.attackBox.position.x = (this.side === 'right') ? this.position.x : this.attackBox.position.x - 50;
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)


        }

    }

    update() {
        this.draw();
        this.movement();
        if (this.isAttacking) colision();
        checkSide();
        this.checkBorder();

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;



        if (this.position.y + this.height + this.velocity.y >= canvas.height-100) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }

    movement() {
        this.velocity.x = 0;
        if (this.canMove) {
            if ((this.keys.a?.pressed || this.keys.ArrowLeft?.pressed) && (this.lastKey == 'a' || this.lastKey == "ArrowLeft")) {
                this.velocity.x = -this.speed;
            } else if ((this.keys.d?.pressed || this.keys.ArrowRight?.pressed) && (this.lastKey == 'd' || this.lastKey == "ArrowRight")) {
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
            this.canAttack = true;
        }, 1000);
    }

    checkBorder() {
        if (this.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
        } else if (this.position.x + this.velocity.x >= 980) {
            this.velocity.x = 0;
        }
    }


}