var feelTheBern = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.html('<img src="img/bernie.png" height="100px" width="100px" />');
  this.move((Math.random() - 0.5) * 2, Math.random() * 50 + 25, -1, Math.random() * 50 + 25);
};

feelTheBern.prototype = Object.create(makeDancer.prototype);

feelTheBern.prototype.constructor = feelTheBern;

feelTheBern.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  this.hop(100);
};


