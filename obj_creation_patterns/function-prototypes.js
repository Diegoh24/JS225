/*

In JS, every function has a special prototype property. It is assigned, by default, an object that instances
created by the constructor function can delegate to.

*/

let Foo = function() {};
let obj = Foo.prototype;

let bar = new Foo();
let baz = new Foo();

Object.getPrototypeOf(bar) === obj;
Object.getPrototypeOf(baz) === obj;

bar.constructor === Foo;
baz.constructor === Foo;

bar instanceof Foo;
baz instanceof Foo;


let Dog = function () {};


/*
Prototype Pattern
- defining shraed behaviors on the constructor's prototype property
*/
Dog.prototype.say = function() {
  console.log(this.name + ' says Woof!');
}

Dog.prototype.run = function() {
  console.log(this.name + ' runs away');
}

let fido = new Dog();
fido.name = 'Fido';
fido.say()
fido.run();