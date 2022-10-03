function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}

// Factory Functions Object Creation Pattern
function createInvoice(services = {}) {

  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      payments.forEach(payment => this.addPayment(payment));
    },

    totalPayments() {
      return this.payments.reduce((sum, payment) => sum + payment.total(), 0);
    },

    amountDue() {
      console.log(this.total() - this.totalPayments())
    },
  };
}

function invoiceTotal(invoices) {
  let total = 0;
  let i;

  for (i = 0; i < invoices.length; i += 1) {
    total += invoices[i].total();
  }

  return total;
}

// let invoices = [];
// invoices.push(createInvoice());
// invoices.push(createInvoice({
//   internet: 6500,
// }));

// invoices.push(createInvoice({
//   phone: 2000,
// }));

// invoices.push(createInvoice({
//   phone: 1000,
//   internet: 4500,
// }));

// console.log(invoiceTotal(invoices));             // => 31000


function createPayment(services = {}) {
  return {
    internet: services.internet || 0,
    phone: services.phone || 0,
    amount: services.amount,
    total() {
      return services.amount || this.phone + this.internet;
    },
  };
}


function paymentTotal(payments) {
  let total = 0;
  let i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

// let payments = [];
// payments.push(createPayment());
// payments.push(createPayment({
//   internet: 6500,
// }));

// payments.push(createPayment({
//   phone: 2000,
// }));

// payments.push(createPayment({
//   phone: 1000,
//   internet: 4500,
// }));

// payments.push(createPayment({
//   amount: 10000,
// }));


// console.log(paymentTotal(payments));      // => 24000

// console.log(payments);



let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue();       // this should return 0


function Testing() {
 return;
}


console.log(Testing.prototype.isPrototypeOf(Testing));
console.log(Testing.prototype, Testing.prototype.constuctor);


let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object
let ninjaB = new ninjaA.constructor

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true


let shape = {
  getType() {
   console.log(this.type);
  },
};

function Triangle(a, b, c) {
   this.a = a;
   this.b = b;
   this.c = c;
   this.type = "Triangle";
}

Triangle.prototype = shape;

Triangle.prototype.constructor = Triangle;

shape.getPerimeter = function() {
  console.log(this.a + this.b + this.c);
}

let t = new Triangle(3, 4, 5);

console.log(t.constructor);                 // Triangle(a, b, c)
console.log(shape.isPrototypeOf(t));        // true
t.getPerimeter();              // 12
t.getType();                   // "triangle"


function User(first, last) {
  if (this.constructor === User) {
    this.name = first + ' ' + last;
  } else {
    return new User(first, last);
  }
}

function neww(constructor, args) {
  let object = Object.create(constructor.prototype);
  constructor.call(object, ...args);

  return object;
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
console.log(john.constructor);         // Person(firstName, lastName) {...}


function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};

Rectangle.prototype.toString = function() {
  return `[Rectangle ${this.length} x ${this.width}]`;
};

function Square(size) {
  Rectangle.call(this, size, size);
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square

Square.prototype.toString = function() {
  return `[Square ${this.length} x ${this.width}]`;
};


class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }

  toString() {
    return `[Rectangle ${this.width * this.length}]`;
  }
}

// the Square constructor's prototype inherits from Rectangle.prototype
class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  toString() {
    return `[Square] ${this.width * this.length}`;
  }
}

//

/*
Using getPrototypeOf and Object.create, you can create a prototype chain that mimics
classical inheritance
*/
Object.getPrototypeOf([]) === Array.prototype;
// the empty array is an object whose prototype object is the Array.prototype object
function NewArray() {}
NewArray.prototype = Object.create(Object.getPrototypeOf([]));
// use Object.create to have NewArray.prototype object inheirt from `Array.prototype`
// NewArray.prototype can now delegate all the Array methods to Array.prototype


/*
If you want to have an object constructor that returns a new object with a function or
property that cannot be modified, you need to Object.defineProperties method

Object.defineProperties you can provide properties and values and set whether each property
can be changed or not
- ready only properties
*/
let obj = {
  name: 'Obj',
};

Object.defineProperties(obj, {
  age: {
    value: 30,
    writable: false,
  },
});

console.log(obj.age);
obj.age = 32;
console.log(obj.age);