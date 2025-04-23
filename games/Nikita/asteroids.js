// asteroids.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    angle: 0,
    rotation: 0,
    thrusting: false,
    thrust: {
        x: 0,
        y: 0
    },
    lives: 3
};

let bullets = [];
let asteroids = [];
let score = 0;
let gameOver = false;
let asteroidSpawnTimer = 0;

const FRICTION = 0.7;
const SHIP_THRUST = 0.1;
const TURN_SPEED = 0.08;
const BULLET_SPEED = 5;
const ASTEROID_SIZE = 50;
const ASTEROID_SPEED = 1.5;
const ASTEROID_SPAWN_INTERVAL = 100; // frames

function spawnAsteroid() {
    let x, y;
    do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
    } while (distBetweenPoints(ship.x, ship.y, x, y) < 100);

    asteroids.push({
        x: x,
        y: y,
        radius: ASTEROID_SIZE / 2,
        xVel: Math.random() * ASTEROID_SPEED * (Math.random() < 0.5 ? 1 : -1),
        yVel: Math.random() * ASTEROID_SPEED * (Math.random() < 0.5 ? 1 : -1)
    });
}

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function shootBullet() {
    bullets.push({
        x: ship.x + ship.radius * Math.cos(ship.angle),
        y: ship.y - ship.radius * Math.sin(ship.angle),
        xVel: BULLET_SPEED * Math.cos(ship.angle),
        yVel: -BULLET_SPEED * Math.sin(ship.angle)
    });
}

function update() {
    if (gameOver) return;

    // Rotation
    ship.angle += ship.rotation;

    // Thrust
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.angle);
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.angle);
    } else {
        ship.thrust.x -= FRICTION * ship.thrust.x;
        ship.thrust.y -= FRICTION * ship.thrust.y;
    }

    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

    // Screen wrap
    if (ship.x < 0) ship.x = canvas.width;
    if (ship.x > canvas.width) ship.x = 0;
    if (ship.y < 0) ship.y = canvas.height;
    if (ship.y > canvas.height) ship.y = 0;

    // Bullets update
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].x += bullets[i].xVel;
        bullets[i].y += bullets[i].yVel;

        if (bullets[i].x < 0 || bullets[i].x > canvas.width ||
            bullets[i].y < 0 || bullets[i].y > canvas.height) {
            bullets.splice(i, 1);
        }
    }

    // Asteroid update
    for (let asteroid of asteroids) {
        asteroid.x += asteroid.xVel;
        asteroid.y += asteroid.yVel;

        if (asteroid.x < 0) asteroid.x = canvas.width;
        if (asteroid.x > canvas.width) asteroid.x = 0;
        if (asteroid.y < 0) asteroid.y = canvas.height;
        if (asteroid.y > canvas.height) asteroid.y = 0;
    }

    // Bullet-asteroid collisions
    for (let i = asteroids.length - 1; i >= 0; i--) {
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (distBetweenPoints(bullets[j].x, bullets[j].y, asteroids[i].x, asteroids[i].y) < asteroids[i].radius) {
                asteroids.splice(i, 1);
                bullets.splice(j, 1);
                score += 100;
                document.getElementById("score").textContent = score;
                break;
            }
        }
    }

    // Ship-asteroid collisions
    for (let asteroid of asteroids) {
        if (distBetweenPoints(ship.x, ship.y, asteroid.x, asteroid.y) < ship.radius + asteroid.radius) {
            gameOver = true;
            localStorage.setItem("finalScore", score);
            document.getElementById("game-over-screen").classList.remove("d-none");
            break;
        }
    }

    // Spawn new asteroids over time
    asteroidSpawnTimer++;
    if (asteroidSpawnTimer >= ASTEROID_SPAWN_INTERVAL) {
        spawnAsteroid();
        asteroidSpawnTimer = 0;
    }
}

function drawShip(x, y, a) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(
        x + ship.radius * Math.cos(a),
        y - ship.radius * Math.sin(a)
    );
    ctx.lineTo(
        x - ship.radius * (Math.cos(a) + Math.sin(a)) / 2,
        y + ship.radius * (Math.sin(a) - Math.cos(a)) / 2
    );
    ctx.lineTo(
        x - ship.radius * (Math.cos(a) - Math.sin(a)) / 2,
        y + ship.radius * (Math.sin(a) + Math.cos(a)) / 2
    );
    ctx.closePath();
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ship
    drawShip(ship.x, ship.y, ship.angle);

    // Draw bullets
    ctx.fillStyle = "white";
    for (let bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2, false);
        ctx.fill();
    }

  
    ctx.strokeStyle = "white";
    for (let asteroid of asteroids) {
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2, false);
        ctx.stroke();
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener("keydown", function (e) {
    switch (e.code) {
        case "ArrowLeft":
            ship.rotation = -TURN_SPEED;
            break;
        case "ArrowRight":
            ship.rotation = TURN_SPEED;
            break;
        case "ArrowUp":
            ship.thrusting = true;
            break;
        case "Space":
            shootBullet();
            break;
    }
});

document.addEventListener("keyup", function (e) {
    switch (e.code) {
        case "ArrowLeft":
        case "ArrowRight":
            ship.rotation = 0;
            break;
        case "ArrowUp":
            ship.thrusting = false;
            break;
    }
});

document.getElementById("retryBtn").addEventListener("click", function () {
    location.reload();
});

// Init
for (let i = 0; i < 5; i++) {
    spawnAsteroid();
}
gameLoop();