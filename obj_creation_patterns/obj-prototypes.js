// let foo = {};
// let qux = Object.create(foo); //sets the [[prototype]] property of the created object to the `foo`
// // created the object qux with the object `foo` as its prototype

// console.log(Object.getPrototypeOf(qux) === foo);
// console.log(foo.isPrototypeOf(qux));

// let bar = {}
// Object.setPrototypeOf(qux, bar)

let prot = {}
let foo = Object.create(prot);
console.log(Object.getPrototypeOf(foo) === prot);
console.log(prot.isPrototypeOf(foo));

prot.isPrototypeOf(foo); // true
Object.prototype.isPrototypeOf(foo); // true, since Object.prototype is at the end of the chain for all objects