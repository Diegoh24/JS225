/*

ancestors method
returns the prototype chain (ancestors) of a calling object as an aray of object names
, always ends on object.prototype...
*/

Object.prototype.ancestors = function() {
  let ancestor = Object.getPrototypeOf(this);

  if (this.name) return [this.name].concat(ancestor.ancestors());

  return ['Object.prototype'];
}

const foo = { name: 'foo' };
const bar = Object.create(foo);

bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());
baz.ancestors();
bar.ancestors();
foo.ancestors();
