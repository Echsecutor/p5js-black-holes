function Star(bh_img) {
  this.object = new PhysicalObject();

  this.img = bh_img;

  this.object.position.x = random(width);
  this.object.position.y = random(height);
  var max_init_speed = 1;
  this.object.velocity.x = random(-max_init_speed, max_init_speed);
  this.object.velocity.y = random(-max_init_speed, max_init_speed);

  this.scale_img = 1.1;


  this.resize = function() {
    this.object.size.x = 10 * Math.sqrt(this.object.mass);
    this.object.size.y = this.object.size.x;
  }

  this.resize();



  this.draw = function() {
    this.object.update();

    if (this.object.mass < 10) {
      fill(255, 255, 0);
      triangle(this.object.position.x, this.object.position.y - this.object.size.y,
        this.object.position.x - this.object.size.x, this.object.position.y + this.object.size.y / 2,
        this.object.position.x + this.object.size.x, this.object.position.y + this.object.size.y / 2);
      triangle(this.object.position.x, this.object.position.y + this.object.size.y,
        this.object.position.x - this.object.size.x, this.object.position.y - this.object.size.y / 2,
        this.object.position.x + this.object.size.x, this.object.position.y - this.object.size.y / 2);
      fill(0, 0, 0);
    } else {
      image(this.img, this.object.position.x - this.scale_img*this.object.size.x/2, this.object.position.y - this.scale_img*this.object.size.y/2, this.scale_img*this.object.size.x, this.scale_img*this.object.size.y);
      fill(255, 255, 255);
    }
    var label = Math.floor(this.object.mass).toString();
    text(label, this.object.position.x - 5*label.length, this.object.position.y + 6);
  }

}
