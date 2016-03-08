var makeVanDamme = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.html('<img src="img/vandamme.gif" height="200" width="300"/>');
  this.degrees = 0;
  this.spinTimer;

  this.move((Math.random() - 0.5) * 2, Math.random() * 50 + 25, (Math.random() - 0.5) * 2, Math.random() * 50 + 25);
};

makeVanDamme.prototype = Object.create(makeDancer.prototype);

makeVanDamme.prototype.constructor = makeVanDamme;

makeVanDamme.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  // this.spinHead();
  // this.spinBody();
};


