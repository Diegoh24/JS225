// // let a = 1;
// // let foo;
// // let obj;

// // function Foo() {
// //   this.a = 2;
// //   console.log(this);
// //   this.bar = function() {
// //     console.log(this.a);
// //   };
// //   this.bar();
// // }

// // foo = new Foo();
// // foo.bar();
// // Foo();

// // obj = {};
// // Foo.call(obj);
// // obj.bar();

// console.log(this.a);

// let RECTANGLE = {
//   area() {
//     return this.width * this.height;
//   },
//   perimeter() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area.call(this);
//   this.perimeter = RECTANGLE.perimeter.call(this);
// }

// let rect1 = new Rectangle(2, 3);
// console.log(rect1.area);
// console.log(rect1.perimeter);


// //circle, takes a radius arg.
// // area method
// function Circle(radius) {
//   this.radius = radius;
// }

// Circle.prototype.area = function() {
//   return Math.PI * (this.radius ** 2);
// }

// let a = new Circle(3);
// let b = new Circle(4);

// console.log(a.area().toFixed(2)); // => 28.27
// console.log(b.area().toFixed(2)); // => 50.27


// //let ninjaA;
// // let ninjaB;
// function Ninja() {
//   this.swung = false;
// }

// Ninja.prototype.swing = function() {
//   this.swung = true;
//   return this;
// }

// //ninjaA = new Ninja();
// // ninjaB = new Ninja();

// // Add a swing method to the Ninja prototype which
// // returns the calling object and modifies swung

// //console.log(ninjaA.swing().swung);      // must log true
// // console.log(ninjaB.swing().swung);      // must log true


// let ninjaA = (function() {
//   function Ninja(){};
//   return new Ninja();
// })();

// // create a ninjaB object
// let con = Object.getPrototypeOf(ninjaA).constructor;
// let ninjaB = new con();

// console.log(ninjaB.constructor === ninjaA.constructor);    // should log true

// let shape = {
//   getType() {
//     return this.type;
//   },

//   getPerimeter() {
//     return this.a + this.b + this.c;
//   },
// };

// function Triangle(a, b, c) {
//   this.a =  a;
//   this.b = b;
//   this.c = c;
//   this.type = 'triangle';
// }

// Triangle.prototype = shape;
// Triangle.prototype.consutrctor = Triangle;

// let t = new Triangle(3, 4, 5);
// console.log(t.constructor);                 // Triangle(a, b, c)
// console.log(shape.isPrototypeOf(t));        // true
// console.log(t.getPerimeter());              // 12
// console.log(t.getType());                   // "triangle"


// function User(first, last) {
//   if (User === this.constructor) {
//     this.name = first + ' ' + last;
//   } else {
//     return new User(first, last);
//   }
// }

// console.log(undefined);
// let name = 'Jane Doe';
// let user1 = new User('John', 'Doe');

// let user2 = User('John', 'Doe');

// console.log(name);         // => Jane Doe
// console.log(user1.name);   // => John Doe
// console.log(user2.name);   // => John Doe

// function createObject(obj) {
//   function F() {}
//   F.prototype = obj;
//   return new F();
// }

// let foo = {
//   a: 1
// };

// let bar = createObject(foo);
// console.log(foo.isPrototypeOf(bar));         // true

Object.prototype.begetObject = function() {
  function F() {}
  F.prototype = this;
  return new F();
}

let foo = {
  a: 1,
};

let bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar));         // true


function neww(constructor, args) {
  let newObj = Object.create(constructor.prototype);
  let result = constructor.apply(newObj, args);

  return typeof result === 'object' ? result : newObj;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
john.constructor;         // Person(firstName, lastName) {...}