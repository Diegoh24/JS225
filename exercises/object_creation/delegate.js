

/*
delegate function,

- used to delegate behavior of a method or function to another object's method

input: 2 arguments: object, and the name of the method on the object
the remaining arguments if any are passed as arguments to the objects methods that it
delegates to.

capture the rest of args with rest syntax.
look up the inheritance chain..

this method is called on the object
*/
function delegate(object, method, args) {
  return () => object[method].call(object, args);
}


const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = () => { console.log('changed'); };

baz.qux();          // logs 'changed'