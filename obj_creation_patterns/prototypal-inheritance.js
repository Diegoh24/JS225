// // // let foo = {
// // //   a: 1,
// // //   b: 2,
// // // };

// // // let bar = Object.create(foo);
// // // let baz = Object.create(bar);

// // // console.log(bar.a);
// // // console.log(baz.a);


// // // let foo = {
// // //   hello() {
// // //     return 'hello ' + this.name;
// // //   },
// // // };

// // // let bar = Object.create(foo);
// // // bar.name = 'world';

// // // console.log(bar.hello());
// // // the hello method is found on the bar object's prototype object, then called
// // // with the context of the `bar` object itself.

// // let dog = {
// //   say() {
// //     console.log(this.name + ' says Woof');
// //   },

// //   run() {
// //     console.log(this.name + ' is running');
// //   },
// // };

// // let fido = Object.create(dog);
// // fido.name = 'fido';
// // fido.say = function() {
// //   console.log(this.name + ' says Woof Woof!');
// // }


// // fido.say();
// // fido.run();

// // function p(val) {
// //   console.log(val);
// // }

// // let foo = { a: 1 };

// // let bar = Object.create(foo);
// // bar.a = 1;
// // bar.b = 2;

// // p (bar.hasOwnProperty('a'));
// // p(Object.getOwnPropertyNames(bar));

// // delete bar.a;

// // p (bar.hasOwnProperty('a'));


// // function getDefiningObject(object, propKey) {
// //   while (object && !object.hasOwnProperty(propKey)) {
// //     object = Object.getPrototypeOf(object);
// //   }

// //   return object;
// // }

// // let foo = {
// //   a: 1,
// //   b: 2,
// // };

// // let bar = Object.create(foo);
// // let baz = Object.create(bar);
// // let qux = Object.create(baz);

// // bar.c = 3;

// // console.log(getDefiningObject(qux, 'c') === bar);     // => true
// // console.log(getDefiningObject(qux, 'e'));             // => null



// function shallowCopy(object) {
//   let copy = Object.create(Object.getPrototypeOf(object));

//   Object.getOwnPropertyNames(object).forEach((prop) => {
//     copy[prop] = object[prop];
//   });

//   return copy;
// }

// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = Object.create(foo);
// bar.c = 3;
// bar.say = function() {
//   console.log('c is ' + this.c);
// };

// let baz = shallowCopy(bar);
// console.log(baz.a);       // => 1
// baz.say();                // => c is 3
// console.log(baz.hasOwnProperty('a'));  // false
// console.log(baz.hasOwnProperty('b'));  // false

// extends an object (destination object) with the contents from multiple objects)


function extend(...destination) {
  let newObj = destination.shift();
  destination.forEach(object => newObj = {...newObj, ...object} );
  return newObj;
}

let foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // => 1
object.sayHello();                // => Hello, Joe