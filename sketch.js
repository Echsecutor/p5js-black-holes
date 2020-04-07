'use strickt'

var player;
var objects = [];
var want_objects = 50;
var gravity_const = 2;
var difficulty = 0.7;

const PLAYING = "PLAYING";
const LOOSE = "LOOSE";
const WIN = "WIN";

var game_mode = PLAYING;

var msg = "Use the arrow keys to move!";

let bh_img;
let bh_img_red;

function reset() {
  player = new Star(bh_img);
  player.object.mass = 10;
  player.resize();
  player.object.position.x = width / 2;
  player.object.position.y = height / 2;
  player.is_player = true

  objects = [player, ]
  game_mode = PLAYING;
  frameRate(60)
}

function control() {
  var speed = 0.1;

  if (keyIsDown(LEFT_ARROW)) {
    player.object.acceleration.x += -speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.object.acceleration.x += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    player.object.acceleration.y += -speed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.object.acceleration.y += speed;
  }

  if (touches.length > 0) {
    //console.log(touches[0])
    player.object.acceleration = p5.Vector.sub(createVector(touches[0].x, touches[0].y), player.object.position).normalize()
    player.object.acceleration.mult(speed)
  }
  player.object.velocity.mult(0.99);

}

function preload() {
  bh_img = loadImage('BH.png');
  bh_img_red = loadImage('BH-red.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  createCanvas(width, height);
  reset();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function camera_follow() {
  var direction = p5.Vector.sub(createVector(width / 2, height / 2), player.object.position).normalize();
  for (var i = 0; i < objects.length; i++) {
    objects[i].object.velocity.add(p5.Vector.mult(direction, 0.05));
  }
}

function draw_objects() {
  for (var i = 0; i < objects.length; i++) {
    objects[i].draw();
    for (var j = i + 1; j < objects.length; j++) {
      if (objects[i].object.collides_with(objects[j].object)) {
        var heavier = i;
        var lighter = j;
        if (objects[i].object.mass < objects[j].object.mass) {
          heavier = j;
          lighter = i;
        } else {
          j--;
        }
        if (objects[lighter].is_player) {
          game_mode = LOOSE;
          difficulty *= 0.5;
          frameRate(1)
        }
        objects[heavier].object.mass += objects[lighter].object.mass
        objects[heavier].resize();
        objects.splice(lighter, 1);

        msg = "My mass: " + Math.ceil(player.object.mass)
        if (player.object.mass > 1000) {
          game_mode = WIN;
          difficulty += (1 - difficulty) * 0.5;
          frameRate(1)
        }

        if (lighter == i) {
          i--;
          break;
        }
      } else {
        var direction = p5.Vector.sub(objects[i].object.position, objects[j].object.position)
        var dist = direction.mag() + 0.01

        objects[i].object.acceleration = p5.Vector.mult(direction, -gravity_const * objects[j].object.mass / dist / dist)
        objects[j].object.acceleration = p5.Vector.mult(direction, gravity_const * objects[i].object.mass / dist / dist)

      }
    }
  }
}



function keyPressed() {
  if (game_mode != PLAYING) {
    reset();
  }
}

function touchStarted() {
  if (game_mode != PLAYING) {
    reset();
  }
}


function draw() {
  background(0);

  fill(255, 255, 50);
  textSize(16);
  text("Difficulty: " + Math.round(100 * difficulty), 10, 10, width - 10, height - 10);

  if (objects.length < want_objects) {
    objects.push(new Star(bh_img_red));
    objects[objects.length - 1].object.mass = random(player.object.mass * difficulty);
    objects[objects.length - 1].resize();
  }

  if (game_mode === PLAYING) {
    control();
    draw_objects();
  } else if (game_mode === LOOSE) {
      textSize(50);
      fill(155, 0, 0);
        textAlign(CENTER);
      text("YOU LOOSE!\nGAME OVER!", 10, height / 2, width -10, height - 10);
    } else if (game_mode === WIN) {
      textSize(50);
      fill(255, 255, 50);
              textAlign(CENTER);
      text("YOU WIN!", 10, height / 2, width -10, height - 10);
    }
  
  camera_follow();
}
