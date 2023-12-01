const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
const cenarios = ['../img/sprites/stage3.png'];
const numCenario = Math.floor(Math.random() * cenarios.length) + 1 - 1;


function colision() {

    if (checkColision(player, enemy) && player.isAttacking) {
        player.isAttacking = false;
        enemy.life -= 20;

        doknockBack(enemy);

        document.querySelector('#enemy-bar').style.width = enemy.life + "%";
    }
    if (checkColision(enemy, player) && enemy.isAttacking) {
        enemy.isAttacking = false;
        player.life -= 20;

        doknockBack(player);

    
        document.querySelector('#player-bar').style.width = player.life + "%";
    }
}

function checkColision(attacker, target) {
    let attackerHitboxX = attacker.attackBox.position.x;
    let attackerHitboxXEnd = attacker.attackBox.width + attackerHitboxX;
    let targetHitboxX = target.position.x;
    let targetHitboxXEnd = target.width + targetHitboxX;


    let attackerHitboxY = attacker.attackBox.position.y + attacker.attackBox.height;
    let targetHitboxY = target.position.y + target.height;
    if (attacker.side === "right") {
        return (

            attackerHitboxXEnd >= targetHitboxX &&
            attackerHitboxY >= target.position.y &&
            attacker.position.y <= targetHitboxY
        );
    } else {

        attackerHitboxX *= -1;
        attackerHitboxXEnd = attacker.attackBox.width + attackerHitboxX;

        return (
            attackerHitboxX - 100 <= targetHitboxXEnd &&
            attackerHitboxXEnd >= targetHitboxX &&
            attackerHitboxY >= target.position.y &&
            attacker.position.y <= targetHitboxY
        )
    }

}

function doknockBack(object) {
    object.canMove = false;
    object.canAttack = false;
    let knockback = 0;
    if(object.position.x + 20 <= 965 && object.position.x -20 >= 10) {
        knockback = (object.side === 'left') ? +30 : -30; 
    }
    
    let a = setInterval(object.position.x += knockback, 200);
    setTimeout(() => {
        clearInterval(a);
        object.canMove = true;
        object.canAttack = true;
    }, 1000);
}

function checkSide() {
    if (player.position.x < enemy.position.x) {
        player.side = 'right';
        enemy.side = 'left';
    } else {
        player.side = 'left';
        enemy.side = 'right';
    }
}

function checkWinner({ player, enemy, timer }) {
    document.querySelector("#battle-result").style.display = "flex";
    clearTimeout(timer);
    if (player.life == enemy.life) {
        document.querySelector("#battle-result").textContent = "Empate";
    } else if (player.life > enemy.life) {
        enemy.life = 0;
        enemy.canAttack = false;
        enemy.canMove = false;
        player.canAttack = false;
        player.canMove = false;
        player.win = true;
        document.querySelector("#battle-result").textContent = "Jogador 1 ganha";
    } else if (player.life < enemy.life) {
        player.life = 0;
        player.canAttack = false;
        player.canMove = false;
        enemy.canAttack = false;
        enemy.canMove = false;
        enemy.win = true;
        document.querySelector("#battle-result").textContent = "Jogador 2 ganha";

    }
}

const back = new Background({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: cenarios[numCenario]
})

const player = new Personagem({
    position: {
        x: 100,
        y: 340
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
    },
    color: 'purple',
    side: 'right',
    imageSrc: '../img/sprites/jotaro_idle.png',
    framesMax: 23,
    scale: 2,
    offset: {
        x: 45,
        y: 50
    },
    AttackBoxoffset: {
        x: -150,
        y: 0
    },
    sprites: {
        idle: {
            imageSrc: '../img/sprites/jotaro_idle.png',
            framesMax: 23
        },
        run: {
            imageSrc: '../img/sprites/jotaro_walking.png',
            framesMax: 16
        },
        attack: {
            imageSrc: '../img/sprites/jotaro_attack.png',
            framesMax: 24
        },
        win: {
            imageSrc: '../img/sprites/jotaro_win.png',
            framesMax: 11
        }
    }
});


const enemy = new Personagem({
    position: {
        x: 850,
        y: 340
    },
    velocity: {
        x: 0,
        y: 10
    },
    keys: {
        ArrowLeft: {
            pressed: false
        },
        ArrowRight: {
            pressed: false
        },
        ArrowDown: {
            pressed: false
        }
    },
    color: 'green',
    side: 'left',
    imageSrc: '../img/sprites/dio_idle.png',
    framesMax: 6,
    scale: 2,
    offset: {
        x: 40,
        y: 50
    },
    AttackBoxoffset: {
        x: -150,
        y: 0
    },
    sprites: {
        idle: {
            imageSrc: '../img/sprites/dio_idle.png',
            framesMax: 6
        },
        run: {
            imageSrc: '../img/sprites/dio_walking.png',
            framesMax: 16
        },
        attack: {
            imageSrc: '../img/sprites/dio_attacking.png',
            framesMax: 18
        },
        win: {
            imageSrc: '../img/sprites/dio_win.png',
            framesMax: 2
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
            if (player.canAttack) {
                player.canAttack = false;
                player.attack();
            }
            break;

        case "ArrowLeft":
            enemy.keys.ArrowLeft.pressed = (isKeyDown) ? true : false;
            if (isKeyDown) enemy.lastKey = 'ArrowLeft';
            break;
        case "ArrowRight":
            enemy.keys.ArrowRight.pressed = (isKeyDown) ? true : false;
            if (isKeyDown) enemy.lastKey = 'ArrowRight';
            break;
        case "ArrowDown":
            enemy.keys.ArrowDown.pressed = (isKeyDown) ? true : false;
            if (enemy.canAttack) {
                enemy.canAttack = false;
                enemy.attack();
            }
            break;
    }
}

window.addEventListener("keydown", (e) => {
    movement(e, true);
});

window.addEventListener("keyup", (e) => {
    movement(e, false);
});

let time = 20;
let timer;
function decreaseTime() {
    if (time > 0) {
        timer = setTimeout(decreaseTime, 1000);
        time--;
        document.querySelector("#timer-content").textContent = time;
    } else {
        checkWinner({ player, enemy, timer });
    }


}



function animate() {
    // setTimeout(function () {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    back.update();

    player.update();
    enemy.update();




    if (player.life <= 0 || enemy.life <= 0) {
        checkWinner({ player, enemy, timer });
    }
    //}, 1000 / 30);



}

function showLifeBar() {
    document.querySelector("#enemy-bar-container").style.display = 'flex';
    document.querySelector("#timer").style.display = 'flex';
    document.querySelector("#player-bar-container").style.display = 'flex';
}




let time_start = 1;
let timer_start;
function countdown() {
    document.querySelector("#battle-result").style.display = 'flex';
    if (time_start > 0) {
        document.querySelector("#battle-result").textContent = time_start;
        time_start--;
        timer_start = setTimeout(countdown, 1000);
    } else {
        document.querySelector("#battle-result").textContent = "Fight!";
        setTimeout(() => {
            document.querySelector("#battle-result").textContent = "";
            showLifeBar();
            animate();
            decreaseTime();

        }, 1000);
    }
}

countdown();

