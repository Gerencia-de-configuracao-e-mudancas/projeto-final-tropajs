class Background {
    constructor({ position, imgSrc }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imgSrc;
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}

class Personagem {
    constructor({ position, velocity, keys, color, side, imageSrc, AttackBoxoffset ,scale = 1, framesMax, offset = { x: 0, y: 0 }, sprites }) {
        this.position = position;
        this.velocity = velocity;
        this.keys = keys;
        this.color = color;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.imageSrc = imageSrc
        this.image.src = imageSrc;
        this.lastKey;
        this.isAttacking;
        this.isAttackingAnimation;
        this.canMove = true;
        this.attackBox = {
            position: {
                x: this.position.x - AttackBoxoffset.x,
                y: this.position.y - AttackBoxoffset.y
            },
            width: 140,
            height: 50
        };
        this.win = false;
        this.attackBoxSprite = new Image();
        this.AttackBoxoffset = AttackBoxoffset
        this.attackBoxSprite.src = imageSrc;

        this.speed = 5;
        this.side = side;
        this.life = 100;
        this.canAttack = true;

        this.scale = scale;
        this.offset = offset,
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5

        this.framesCurrentAttack = 0;
        this.framesElapsedAttack = 0;
        this.framesHoldAttack = 5;
       

        this.sprites = sprites;
        this.currentSprite;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
          }
    }

    draw() {
        if (this.life > 0) {
            c.save();

            if (this.side === 'left') {

                c.scale(-1, 1);

                const invertedX = -this.position.x - this.width;
                c.drawImage(
                    this.image,
                    this.framesCurrent * (this.image.width / this.framesMax),
                    0,
                    this.image.width / this.framesMax,
                    this.image.height,
                    invertedX - this.offset.x,
                    this.position.y - this.offset.y,
                    (this.image.width / this.framesMax) * this.scale,
                    this.image.height * this.scale
                );
                c.fillStyle = 'red';
                c.fillRect(this.position.x, this.position.y, this.width, this.height)
            } else {

                c.drawImage(
                    this.image,
                    this.framesCurrent * (this.image.width / this.framesMax),
                    0,
                    this.image.width / this.framesMax,
                    this.image.height,
                    this.position.x - this.offset.x,
                    this.position.y - this.offset.y,
                    (this.image.width / this.framesMax) * this.scale,
                    this.image.height * this.scale
                )
                c.fillStyle = 'red';
                c.fillRect(this.position.x, this.position.y, this.width, this.height)

                //     }

                //     // Restaura o estado do contexto
                //     c.restore();
            }
            c.restore();
            c.fillStyle = 'red';
            c.fillRect(this.position.x, this.position.y, this.width, this.height)


            // Ataque 
            if (this.isAttackingAnimation) {
                
                c.save();

                let attackimg = new Image();
                attackimg.src = this.sprites.attack.imageSrc
                
                 if (this.side === 'left') {
                    this.attackBox.position.x = this.position.x - this.AttackBoxoffset.x;
                     c.scale(-1, 1);
                     const invertedX = -this.position.x - this.width;
                     c.drawImage(
                        attackimg,
                        this.framesCurrentAttack * (attackimg.width / this.sprites.attack.framesMax),
                        0,
                        attackimg.width / this.sprites.attack.framesMax,
                        attackimg.height,
                        invertedX - this.offset.x,
                        this.position.y - 90,
                        (attackimg.width / this.sprites.attack.framesMax) * this.scale,
                        attackimg.height * this.scale
                    )
                    c.fillStyle = 'red';
                    this.attackBox.position.x = this.position.x - this.AttackBoxoffset.x;
                    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
                    
                } else {
                    c.drawImage(
                        attackimg,
                        this.framesCurrentAttack * (attackimg.width / this.sprites.attack.framesMax),
                        0,
                        attackimg.width / this.sprites.attack.framesMax,
                        attackimg.height,
                        this.position.x - this.offset.x,
                        this.position.y - 90,
                        (attackimg.width / this.sprites.attack.framesMax) * this.scale,
                        attackimg.height * this.scale
                    )
                    c.fillStyle = 'red';
                    this.attackBox.position.x = this.position.x - this.AttackBoxoffset.x;
                    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

                 }
                 
                 c.restore();

                // this.animateFramesAttack();
            }

        }
    }

    switchSprite(){
        switch(this.currentSprite){
            case 'idle': {
                this.image.src = this.sprites.idle.imageSrc;
                this.framesMax = this.sprites.idle.framesMax;
                break;
            }
            case 'run': {
                this.image.src = this.sprites.run.imageSrc;
                this.framesMax = this.sprites.run.framesMax;
                break;
            }
            case 'win': {
                this.image.src = this.sprites.win.imageSrc;
                this.framesMax = this.sprites.win.framesMax;
                break;
            }
        }
    }

    animateFrames() {
        this.framesElapsed++;
        this.framesElapsedAttack++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }

        if (this.framesElapsedAttack % this.framesHoldAttack === 0) {
            if (this.framesCurrentAttack < this.sprites.attack.framesMax- 1) {
                this.framesCurrentAttack++
            } else {
                this.framesCurrentAttack = 0
            }
        }
    }



    update() {
      
        this.draw();
        this.animateFrames();
        this.switchSprite();

        this.movement();
        if (this.isAttacking) colision();
        
        checkSide();
        this.checkBorder();

        if (this.velocity.x == 0) {
            this.currentSprite = 'idle';
        }
        if (this.win == true) {
            this.currentSprite = 'win';
            
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 100) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }

    movement() {
        this.velocity.x = 0;
        if (this.canMove) {
            if ((this.keys.a?.pressed || this.keys.ArrowLeft?.pressed) && (this.lastKey == 'a' || this.lastKey == "ArrowLeft")) {
                this.velocity.x = -this.speed;
                this.currentSprite = 'run';

            } else if ((this.keys.d?.pressed || this.keys.ArrowRight?.pressed) && (this.lastKey == 'd' || this.lastKey == "ArrowRight")) {
                this.velocity.x = this.speed;
                this.currentSprite = 'run';
            }
        }

    }

    attack() {
        this.isAttacking = true;
        this.canMove = false;
        this.isAttackingAnimation = true;
        setTimeout(() => {
            this.isAttackingAnimation = false;
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