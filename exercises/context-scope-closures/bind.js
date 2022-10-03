/*
function.prototype.bind is a method on all function objects that allow you
to hard-bind a function to a particular object.

The way this works is that you pass a context object to the bind method and it returns a new function
that is essentially the same function but hard-bound to the context object supplied.

create myBind - takes two arguments
- the function to bind
- the context object

returns a new function that's hard bound to the passed in context object


function makeBind(func) {
  return function(context, ...args) {
    return func.apply(context, args);
  };
}

function myBind(func) {
  return makeBind(func);
}


let smacked = {
  smacking: true,
  smack() {
    console.log(this.smacking);
  },
}

let sacked = {
  smacking: false,
  sacked: true,
}

let smack = myBind(smacked.smack, smacked);
console.log(smack);