var makeVanDamme = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.html('<img src="img/vandamme.gif" height="200" width="300"/>');
  this.spinTimer;
  this.type = 'vandamme';
  this.move((Math.random() - 0.5) * 2, Math.random() * 100 + 25, 0, 0, -1);
  this.flip(-1);
};

makeVanDamme.prototype = Object.create(makeDancer.prototype);

makeVanDamme.prototype.constructor = makeVanDamme;

makeVanDamme.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  // this.spinHead();
  // this.spinBody();
};


