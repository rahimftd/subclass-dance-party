// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');

  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.step(); 


  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(this.top, this.left);

  
};

makeDancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  var that = this;
  
  setTimeout(function() {
    that.step.call(that);
  }, this.timeBetweenSteps);
};

makeDancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

// makeDancer.prototype.spinHead = function() {};

// makeDancer.prototype.spinBody = function() {};

makeDancer.prototype.spin = function() {
  this.degrees += 360;
  var spinStyle = {
    transform: 'rotate(' + this.degrees + 'deg)',
    transition: 'transform 1s'
  };
  this.$node.css(spinStyle);
  var that = this;
  setTimeout(function() {
    that.spin.call(that);
  }, this.timeBetweenSteps);
};

makeDancer.prototype.move = function(hDir, hDist, vDir, vDist) {
  var that = this;
  this.top = this.top + (vDir * vDist);
  this.left = this.left + (hDir * hDist);
  var moveStyle = {
    top: this.top,
    left: this.left,
    transition: 'top 1s, left 1s',
  };
  this.$node.css(moveStyle);
  setTimeout(function() {
    that.move.call(that, hDir, hDist, vDir, vDist);
  }, this.timeBetweenSteps);
};

makeDancer.prototype.hop = function(height) {
  this.move(-1, 100, -1, height);
  this.move(-1, 100, 1, height);
  this.move(1, 100, -1, height);
  this.move(1, 100, 1, height);
};