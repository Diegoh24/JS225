function objectsEqual(obj1, obj2) {
  return keysMatch(obj1, obj2) && valuesMatch(obj1, obj2);
}

function keysMatch(obj1, obj2) {
  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) return false;

  return obj1Keys.every((key) => obj2Keys.includes(key));
}

function valuesMatch(obj1, obj2) {
  for (let prop in obj1) {
    if (obj1[prop] !== obj2[prop]) return false;
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false