const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

const numCenario = Math.floor(Math.random() * 3) + 1 - 1;
const cenarios = ['../img/sprites/stage-sprite4.jpg', '../img/sprites/stage-sprite.png', '../img/sprites/stage3.png']; 

function colision() {
    if (showColision(player, enemy) && player.isAttacking) {
        player.isAttacking = false;
        enemy.life -= 10;
        document.querySelector('#enemy-bar').style.width = enemy.life + "%";
    }
    if (showColision(enemy, player) && enemy.isAttacking) {
        enemy.isAttacking = false;
        player.life -= 10;
        document.querySelector('#player-bar').style.width = player.life + "%";
    }
}

function showColision(player1, player2) {
    let p1HitboxX = player1.attackBox.position.x;
    let p1HitboxXEnd = player1.attackBox.width + p1HitboxX;
    let p2HitboxX = player2.position.x;
    let p2HitboxXEnd = player2.width + p2HitboxX;

    let p1HitboxY = player1.attackBox.position.y + player1.attackBox.height;
    let p2HitboxY = player2.position.y + player2.height;

    console.log(p1HitboxX, p1HitboxXEnd, p2HitboxX, p2HitboxXEnd);
    return (
        p1HitboxX <= p2HitboxXEnd && p1HitboxXEnd >= p2HitboxX
        &&
        p1HitboxY >= player2.position.y &&
        player1.position.y <= p2HitboxY
    );
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

function checkWinner ({player, enemy, timer}){
    document.querySelector("#battle-result").style.display = "flex";
    clearTimeout(timer);
    if (player.life == enemy.life) {
        document.querySelector("#battle-result").textContent = "Empate";
    } else if(player.life > enemy.life){
        document.querySelector("#battle-result").textContent = "Jogador 1 ganha";
    } else if(player.life < enemy.life) {
        document.querySelector("#battle-result").textContent = "Jogador 2 ganha";

    }
}

const back = new Background ({
    position: {
        x:0,
        y:0
    },
    imgSrc: cenarios[numCenario]
})

const player = new Personagem({
    position: {
        x: 100,
        y: 300
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
    side: 'right'
});

const enemy = new Personagem({
    position: {
        x: 850,
        y: 300
    },
    velocity: {
        x: 0,
        y: 0
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
    side: 'left'
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
        document.querySelector("#timer").textContent = time;
    } else {
        checkWinner({player, enemy, timer});
    }


}

decreaseTime();


function animate() {
    //setTimeout(function () {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    back.update();
    player.update();
    enemy.update();


    if(player.life <= 0 || enemy.life <= 0 ){
        checkWinner({player,enemy, timer});
    }
    //  }, 1000 / 30);



}

animate()
console.log(player);