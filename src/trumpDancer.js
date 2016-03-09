var makeTrump = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.html('<img src="img/trump.gif" height="150px" width="150px" />');
  this.type = 'trump';
  this.flip(-1);
  this.vanDammenation = '<img src="img/explosion.gif-c200" height="150px" width="150px" />';
};

makeTrump.prototype = Object.create(makeDancer.prototype);

makeTrump.prototype.constructor = makeTrump;

makeTrump.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  // this.spinHead();
  // this.spin();
  // this.move(-1, -1);
  // this.move(1, 1);
};

