// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  var that = this;
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');

  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.step(); 
  this.degrees = 0;
  this.timeOut;
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(this.top, this.left);
  // Event handler for mouse interactions
  this.$node.on('mousedown', function(e) {
    e.preventDefault();
    // Declare variable to store node (this)
    var node = $(this);
    // Find current position of node
    var position = node.offset();
    // Create object to store distance between mousedown and the object
    var difference = {
      x: position.left - e.pageX,
      y: position.top - e.pageY
    };
    // Create a handlers object
    var handlers = {
      // Create mousemove event handler that moves object with the mouse
      mousemove: function(e) {
        that.left = difference.x + e.pageX;
        that.top = difference.y + e.pageY;
        node.css({
          left: ( that.left ) + 'px',
          top: ( that.top ) + 'px'
        });
      },
      // Create mouseup event handler that stops object from moving
      mouseup: function(e) {
        $(this).off(handlers);
      }
    };
    // Initiating event handlers on document    
    $(document).on(handlers);
  });

  
};

makeDancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  var that = this;
  
  this.timeOut = setTimeout(function() {
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
  this.timeOut = setTimeout(function() {
    that.spin.call(that);
  }, this.timeBetweenSteps);
};

makeDancer.prototype.move = function(hDir, hDist, vDir, vDist, shouldSwitch) {
  var that = this;
  this.top = this.top + (vDir * vDist);
  this.left = this.left + (hDir * hDist);
  var moveStyle = {
    top: this.top,
    left: this.left,
    transition: 'top 1s, left 1s',
  };
  this.$node.css(moveStyle);
  this.timeOut = setTimeout(function() {
    that.move.call(that, shouldSwitch * hDir, hDist, shouldSwitch * vDir, vDist, shouldSwitch);
  }, this.timeBetweenSteps);
};

makeDancer.prototype.hop = function(height) {
  this.move(-1, 100, -1, height);
  this.move(-1, 100, 1, height);
  this.move(1, 100, -1, height);
  this.move(1, 100, 1, height);
};

makeDancer.prototype.flip = function(orientation) {
  orientation = orientation || -1;
  var that = this;
  var flipStyle = {
    transform: 'scaleX(' + orientation + ')',
    transition: 'transform 0.2s'
  };

  this.$node.css(flipStyle);
  this.timeOut = setTimeout(function() {
    that.flip.call(that, orientation * -1);
  }, Math.max(this.timeBetweenSteps, 300));
};

makeDancer.prototype.lineUp = function(side) {
  var left = 100;
  var top = 10;
  var topIncrement = window.innerHeight / window.dancers.length;

  for (var i = 0; i < window.dancers.length; i++) {
    var lineStyle = {
      left: left,
      top: top,
      transition: 'left 0.5s, top 0.5s'
    };
    window.dancers[i].left = left;
    window.dancers[i].top = top;
    window.dancers[i].$node.css(lineStyle);
    top += topIncrement;
  }
};

makeDancer.prototype.danceParty = function() {
  for (var i = 0; i < window.dancers.length; i++) {
    var left = window.innerWidth * Math.random();
    var top = window.innerHeight * Math.random();
    var danceStyle = {
      left: left,
      top: top,
      transition: 'left 0.5s, top 0.5s'
    };
    window.dancers[i].left = left;
    window.dancers[i].top = top;
    window.dancers[i].$node.css(danceStyle);
  }
};

makeDancer.prototype.zombieTouch = function() {
  for (var i = 0; i < window.dancers.length; i++) {
    for (var j = 0; j < window.dancers.length; j++) {
      if (makeDancer.prototype.calculateDistance(window.dancers[i], window.dancers[j]) < 150 && i !== j) {
        if (window.dancers[i].type === 'zombie' && window.dancers[j].type === 'trump') {
          window.dancers[j].type = 'zombie';
          window.dancers[j].$node.html('<img src="img/zombie.gif" height="150px" width="150px" />');
          // window.dancers[j].$node.css(disappearStyle);
        } else if (window.dancers[j].type === 'zombie' && window.dancers[i].type === 'trump') {
          window.dancers[i].type = 'zombie';
          window.dancers[i].$node.html('<img src="img/zombie.gif" height="150px" width="150px" />');
          // window.dancers[i].$node.css(disappearStyle);
        } else if (window.dancers[i].type !== 'vandamme' && window.dancers[j].type === 'vandamme') {
          var index = i;
          window.dancers[i].$node.html(window.dancers[i].vanDammenation);
          setTimeout(function() {
            window.dancers[index].$node.html('');
          }, 1000);
        } else if (window.dancers[j].type !== 'vandamme' && window.dancers[i].type === 'vandamme') {
          var index = j;
          window.dancers[j].$node.html(window.dancers[i].vanDammenation);
          setTimeout(function() {
            window.dancers[index].$node.html('');
            window.dancers[index].vanDammenation = '';
          }, 1000);
        }
      } 
    }
  }
};

makeDancer.prototype.calculateDistance = function(dancer1, dancer2) {
  if (dancer1.type === 'vandamme') {
    var dancer1Center = {
      top: dancer1.top + 100,
      left: dancer1.left + 150
    };
  } else if (dancer1.type === 'zombie') {
    var dancer1Center = {
      top: dancer1.top + 75,
      left: dancer1.left + 75
    };
  } else if (dancer1.type === 'trump') {
    var dancer1Center = {
      top: dancer1.top + 75,
      left: dancer1.left + 75
    };
  }

  if (dancer2.type === 'vandamme') {
    var dancer2Center = {
      top: dancer2.top + 100,
      left: dancer2.left + 150
    };
  } else if (dancer2.type === 'zombie') {
    var dancer2Center = {
      top: dancer2.top + 75,
      left: dancer2.left + 75
    };
  } else if (dancer2.type === 'trump') {
    var dancer2Center = {
      top: dancer2.top + 75,
      left: dancer2.left + 75
    };
  }

  return Math.sqrt(Math.pow(dancer1Center.top - dancer2Center.top, 2) + Math.pow(dancer1Center.left - dancer2Center.left, 2));
};
