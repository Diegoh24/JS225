/*
typical creation considerations

*/

// let pointA = {
//   x: 30,
//   y: 40,

//   onXAxis() {
//     return this.y === 0;
//   },

//   onYAxis() {
//     return this.x === 0;
//   },

//   distanceToOrigin() {
//     return Math.sqrt((this.x * this.x) + (this.y * this.y));
//   },
// };

// console.log(pointA.distanceToOrigin());
// console.log(pointA.onXAxis());
// console.log(pointA.onYAxis());

// using one object literal is only for a very simple program
// when you need to have many points, you want the points to have their own states, and share certain behaviors


function p(o) {
  console.log(o);
}

// Pseudo-classical pattern \/

let Point = function(x = 0, y = 0) {
  this.x = x;
  this.y = y;
};

Point.prototype.onXAxis = function() {
  return this.y === 0;
}

Point.prototype.OnYAxis = function() {
  return this.x === 0;
}

Point.prototype.distanceToOrigin = function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

let pointA = new Point(30, 40);
let pointB = new Point(20);

p(pointA instanceof Point);
p(pointB instanceof Point);

console.log(pointA.distanceToOrigin());
console.log(pointB.onXAxis());


// OLOO Pattern (objects linking to other objects) \?

// with syntactic sugar `class` keyword

class PointNOTRealCLASS {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  onXAxis() {
    return this.y === 0;
  }

  onYAxis() {
    return this.x === 0;
  }

  distanceToOrigin() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}

// define the shared behaviors on a prototype object
let Point2 = {
  onXAxis() {
    return this.y === 0;
  },

  onYAxis() {
    return this.x === 0;
  },

  distanceToOrigin() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  },

  init(x, y) {            // optional init method to set states
    this.x = x;
    this.y = y;
    return this;
  },
};

// use Object.create to create objects that delegate directly from the prototype object

let pointA2 = Object.create(Point).init(30, 40);
// this form of OLOO require you to call `init` method after creating a new object
// If you don't call init the various properties may not be assigned to usable values


Point2.isPrototypeOf(pointA2); // true
pointA2.distanceToOrigin(); //...

