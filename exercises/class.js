// // class Stack {
// //   #stack;  // PrivateIdentifier syntax

// //   constructor() {
// //     this.#stack = [];
// //   }

// //   push(...items) {
// //     this.#stack.push(...items);
// //     return this.#stack.length;
// //   }

// //   pop() {
// //     return this.#stack.pop();
// //   }

// //   printStack() {
// //     this.#stack.forEach(function(value) {
// //       console.log(value);
// //     });
// //   }
// // };
// // class Stack {
// //   #stack;

// //   constructor() {
// //   this.#stack = [];
// //   }

// //   push(...items) {
// //     this.#stack.push(...items);
// //     return this.#stack.length;
// //   }

// //   pop() {
// //   return this.#stack.pop();
// //   }

// //   printStack() {
// //     this.#stack.forEach(function(value) {
// //       console.log(value);
// //     });
// //   }
// // };

// // var stack1 = new Stack;
// // var stack2 = new Stack;
// // stack1.push('a', 'b');
// // stack1.printStack();                    // 'a' and 'b' are logged
// // stack2.printStack();                    // nothing is logged
// // console.log(stack1.pop() === 'b');      // true

// // // a) Stack data is private (GOOD)
// // console.log(Object.getPrototypeOf(stack1).stack); // undefined - no stack attribute on proto
// // console.log(stack1.stack);                        // undefined - no stack attribute on instance
// // // console.log(stack1.#stack); // SyntaxError: Private field '#stack' must be declared in an enclosing class

// // // b) Stack instances have a meaningful type (GOOD)
// // console.log(Object.getPrototypeOf(stack1) === Object.getPrototypeOf(stack2)); // true
// // console.log(Object.getPrototypeOf(stack1) === Object.prototype);              // false
// // // also:
// // console.log(stack1.constructor === Stack);                                    // true
// // console.log(stack1.constructor === Object);                                   // false

// // // c) Behavior is defined on the prototype (GOOD)
// // console.log(stack1.hasOwnProperty('printStack'));                             // false
// // console.log(Object.getPrototypeOf(stack1).hasOwnProperty('printStack'));      // true
// // console.log(stack1.printStack === stack2.printStack);                         // true


// class TodoList {
//   #list;

//   constructor() {
//   this.#list = [];
//   }

//   add(item) {
//   this.#list.push(item);
//   }

//   display() {
//     this.#list.forEach(item => console.log(item));
//   }
// }

// function makeTodoList() {
//   return new TodoList;
// }

// let fooList = makeTodoList();
// fooList.add('foo item1');
// fooList.add('foo item2');

// let barList = makeTodoList();
// barList.add('bar item1');
// console.log(barList.list);

// barList.display();



/*
Mini inventory Management System:

item requires:
- sku code
- item name
- category
- quantity

3 major parts: item creator, item manager, reports manageer

item manager: methods
- create object
- update objects
- delete
- items property (list of all items not private)
- inStock
- itemsInCategory

item reporter
- init
- createReporter
-report in Stock
*/

let ItemCreator = (function() {
  let validName = name => /[a-z ]+/i.test(name) && name.replace(/\s/g, '').length >= 5;
  let validCategory = category => /[^ ]/.test(category) && category.length >= 5;
  let validQuantity = quantity => typeof quantity === 'number';

  function makeSku(name, category) {
    let sku = name.replace(/\s/g, '').slice(0, 3) + category.slice(0, 2);
    return sku.toUpperCase();
  }

  function validData(name, category, quantity) {
    return (name && category && quantity) &&
    (validName(name) && validCategory(category) && validQuantity(quantity));
  }

  return {
    create(name, category, quantity) {
      if (!validData(name, category, quantity)) return {notValid: true};
      return {
        sku: makeSku(name, category),
        name,
        category,
        quantity,
      };
    }
  }
})();

let ItemManager = {
  items: [],

  findItem(sku) {
    return this.items.filter(item => item.sku === sku).shift();
  },

  create(name, category, quantity) {
    let item = ItemCreator.create(name, category, quantity)
    item.notValid ? false : this.items.push(item);
  },

  update(sku, data) {
    let item = this.findItem(sku);
    Object.keys(data).forEach(datum => item[datum] = data[datum]);
  },

  delete(sku) {
    let item = this.findItem(sku);
    this.items.splice(this.items.indexOf(item), 1);
  },

  inStock() {
    return this.items.filter(item => item.quantity);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  },
};

let ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },

  createReporter(sku) {
    let item = this.items.findItem(sku);

    return {
      itemInfo() {
        Object.keys(item).forEach(key => console.log(`${key}: ${item[key]}`));
      },
    };
  },

  reportInStock() {
    let inStock = this.items.inStock().map(item => item.name).join(',');
    console.log(inStock);
  }
}

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);
// returns list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
ItemManager.itemsInCategory('sports');
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
ItemManager.items;
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3
console.log('-----------');
ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10