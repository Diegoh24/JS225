function newPerson(name) {
  let person = {name,}
  return Object.defineProperties({name,}, {
    log: {
      value() {
        console.log(this.name);
      },
      writable: false
    },
  });
}

let me = newPerson('Shane Riley');
me.log();     // => Shane Riley
me.log = function() { console.log('Amanda Rose'); };
me.log();     // => Shane Riley

function outputList(args) {
  console.log(this);
  console.log(this.check);
  console.log(this.title + ':');

  // args.forEach(function(elem) {
  //   console.log(elem);
  // });
}

let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

// outputList.call(fruitsObj, fruitsObj.list);
outputList.check = 'ok'
outputList.outputList = outputList;

// outputList.outputList();

// let generateStudentId = function() {
//   let studentId = 0;

//   return function() {
//     studentId += 1;
//     return studentId;
//   };
// }();
// using an IIFE to return a function with access to private data
let generateStudentId = (function() {
  let studentId = 0;

  return function() {
    studentId += 1;
    return studentId;
  };
})();


let stu1 = generateStudentId;

let stu2 = generateStudentId;
// console.log(stu1 === stu2);

// stu1();
// stu1();
// stu1();


// console.log(stu2());

function createInventory() {
  let stocks = [];

  return {
    stockCounts() {
      stocks.forEach(function(stock) {
        console.log(stock.name + ': ' + String(stock.count));
      });
    },
    addStock(newStock) {
      let isValid = stocks.every(function(stock) {
        return newStock.name !== stock.name;
      });

      if (isValid) { stocks.push(newStock) }
    },
  };
}



let inventory = (function() {
  let stocks = [];

  return {
    stockCounts() {
      stocks.forEach(function(stock) {
        console.log(stock.name + ': ' + String(stock.count));
      });
    },
    addStock(newStock) {
      let isValid = stocks.every(function(stock) {
        return newStock.name !== stock.name;
      });

      if (isValid) { stocks.push(newStock) }
    },
  };
})();
