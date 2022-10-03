// function Dog(name, breed, weight) {
//   this.name = name;
//   this.breed = breed;
//   this.weight = weight;

//   this.bark = function() {
//     console.log(this.weight > 20 ? 'Woof' : 'yip');
//   };
// }

// // each receive the name, breed, weight properties and bark method

// // each new Dog object creates a new bark method to add to the object
// // each object has its own bark method which is inefficient and wasteful
// // runtime must create a new copy of the method every time you creaete an object

// let maxi = new Dog('Maxi', 'German Shep', 32);
// let dexter = new Dog('Dexter', 'Rotty', 50);
// let biggie = new Dog('Biigie', 'whippet', 9);

// maxi.bark();


function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}
//

// here you assign the prototype object to a `myPrototype` property on the `Dog` function object.
// this clearly shows your intention that all dogs inheirt from the Dog.prototype object

// then you change the constructor function to use Dog.myPrototype as the prototype object



// improve way
Dog.prototype.bark = function() {
  console.log(this.weight > 20 ? 'Woof' : 'yip');
}
//

console.log(Object.getPrototypeOf(Dog));
console.log(Dog);

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

// insted of being defined on individual objects, the `bark` method is
// defined on the [[prototype]] property

// the DogProto object has the only copy of the method
maxi.bark(); // 'Woof!'

