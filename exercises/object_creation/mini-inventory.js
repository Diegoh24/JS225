/*
build a simple inventory management system:

composed od:
- item creator
  - validates an item
- item manager
  - creates, updates, deletes, queries items
- reports manager
  - generates reports for one item or all items

reports for specific items are generated from report objects created by report manager

ITEM CREATOR :
- if any info is not valid, returns an object with a notValid property, value of true
- item objects should not have any methods or properties on them other than the required
Item requirements:
- SKU code : unique identifier (first 3 letters of the item + first 2 letters of category)
- item name : >= 5 characters  (spaces are not counted as chars)
- category : >= 5 characters, only one word.
- quantity : quantity of an item, cannot be blank

ITEM MANAGER:
may add helper methods that are necessary
- create() - creates a new item, return false if unsuccessful
  - args: name, category, quantity
- update() - accepts SKU code, and object as arguments and updates info about the item
  - args: sku Code, object with one property that is the quantity
- delete() - accepts SKU code and deletes the item from the list. ASSUME valid SKU code provided
  - args: sku code
- items property- contains a list of all items
  - a collection of the items
- inStock - lists all items with quantity property greater than 0
- itemsInCategory() - lists all items for a given category
  - category name

REPORTS MANAGERS: (IIFE)
- init (accepts the itemManager object as an argument, assigns it to the items property)
- createReporter() - accepts an SKU code and returns an object
  - the returned object has one method itemInfo().
    - itemInfo() - logs to the console all the properties of an object as k:v pairs on separate lines
- reportInStock() - logs to the console the item names of all the items that are in stock ( comma separated)

Notes:
- each required piece of info for an item corresponds to one proeprty
*/
// inheirts from a creater?
// validate the items
const ItemCreator = function() {
  let validName = name => name.replace(/[^a-z]/gi, '').length >= 5;
  let validCategory = category => !/\s/.test(category) && category.length >= 5;

  function validData(name, category, quantity) {
    if (!(name && category && typeof quantity === 'number')) return false;
    return validName(name) && validCategory(category);
  };

  function makeSKU(itemName, category) {
    let sku = itemName.replace(/\s/g, '').slice(0, 3) + category.slice(0, 2);
    return sku.toUpperCase()
  };


  return function(name, category, quantity) {
    if (validData(name, category, quantity)) {
      this.sku = makeSKU(name, category);
      this.name = name;
      this.category = category;
      this.quantity = quantity;
    } else
      return { notValid: true };
  };
}();

const ItemManager = {
    items: [],

    findItem(sku) {
      return this.items.filter(item => item.sku === sku).shift();
    },

    create(name, category, quantity) {
      let item = new ItemCreator(name, category, quantity);
      if (item.notValid) return false;
      this.items.push(item);
    },

    update(sku, data) {
      Object.assign(this.findItem(sku), data);
    },

    inStock() {
      return this.items.filter(item => item.quantity > 0);
    },

    itemsInCategory(category) {
      return this.items.filter(item => item.category === category);
    },

    delete(sku) {
      let skus = this.items.map(item => item.sku)
      this.items.splice(skus.indexOf(sku), 1)
    },
};

const ReportManager = {
  init(items) {
    this.items = items;
  },

  createReporter(sku) {
    let item = this.items.findItem.call(this.items, sku);
    return {
      itemInfo() {
        Object.keys(item).forEach(datum => console.log(`${datum}: ${item[datum]}`));
      },
    };
  },

  reportInStock() {
    let inStock = this.items.inStock.call(this.items).map(item => item.name);
    console.log(inStock.join(', '));
  },
};


// itemManager, has a create method
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
// // logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());
// // returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// // logs football,kitchen pot
console.log(ItemManager.itemsInCategory('sports'));
console.log('---------------');
// // returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// // returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// // logs
// // skuCode: KITCO
// // itemName: kitchen pot
// // category: cooking
// // quantity: 3
console.log('---');
ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// // logs
// // skuCode: KITCO
// // itemName: kitchen pot
// // category: cooking
// // quantity: 10