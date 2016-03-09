var makeZombie = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.html('<img src="img/zombie.gif" height="150px" width="150px" />');
  this.type = 'zombie';
  this.walkDirection = 1;
  this.orientation = -1;
  this.move(this.walkDirection, Math.random() * 25 + 25);
  this.vanDammenation = '<img src="img/explosion.gif-c200" height="150px" width="150px" />';
};

makeZombie.prototype = Object.create(makeDancer.prototype);

makeZombie.prototype.constructor = makeZombie;

makeZombie.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  // this.spinHead();
  // this.spin();
  // this.move(-1, -1);
  // this.move(1, 1);
};

makeZombie.prototype.loop = function() {
  if (this.left > window.innerWidth - 150 || this.left < 0) {
    this.walkDirection *= -1;
    this.flip(this.orientation);
  }
};

makeZombie.prototype.move = function(hDir, hDist) {
  var that = this;
  this.left = this.left + (hDir * hDist);
  var moveStyle = {
    left: this.left,
    transition: 'left 1s'
  };
  this.$node.css(moveStyle);
  this.timeOut = setTimeout(function() {
    that.move.call(that, that.walkDirection, hDist);
  }, this.timeBetweenSteps);
  this.loop();
};

makeZombie.prototype.flip = function(orientation) {
  this.orientation *= -1;
  var that = this;
  var flipStyle = {
    transform: 'scaleX(' + orientation + ')',
    transition: 'transform 0.5s'
  };

  this.$node.css(flipStyle);
};