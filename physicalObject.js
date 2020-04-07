function PhysicalObject() {
  // position is by convention to be the center
  this.position = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.mass = random(1, 2);

  // width/height for collision detection
  this.size = createVector(0, 0);

  this.collides_with = function(physicalObject) {
    return (Math.abs(this.position.x - physicalObject.position.x) * 2 < this.size.x + physicalObject.size.x &&
      Math.abs(this.position.y - physicalObject.position.y) * 2 < this.size.y + physicalObject.size.y)
  }


  this.update = function() {

    //see https://p5js.org/reference/#/p5.Vector/add
    this.velocity.add(p5.Vector.mult(this.acceleration, 0.05 * deltaTime));
    this.position.add(p5.Vector.mult(this.velocity, 0.05 * deltaTime));

    if (this.position.x > width) {
      this.position.x -= width;
    } else if (this.position.x < 0) {
      this.position.x += width;
    }

    if (this.position.y > height) {
      this.position.y -= height;
    } else if (this.position.y < 0) {
      this.position.y += height;
    }

    //debug: draw collision BB
    //  fill(255, 255, 255)
    //  rect(this.position.x - this.size.x / 2, this.position.y - this.size.y / 2, this.size.x, this.size.y);

    this.acceleration = createVector(0, 0);
  }
}