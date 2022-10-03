/*
using OLOO create an account prototype objec that anonymizes user objects with `init`

The created object should not have access to the function that anonymizes user other
than through the init and reanonymize methods

function creates a 16 char sequence composed of letters and numbers

properties and methods on account object
- init sets email, password, firstName, lastName, and displayName


Account protoype obj:
  - init(email, pas, fName, lName, displayName)

  -reanonymize()
  -resetPass()
  -firstName()
  lName();
  email();
  displayName()

*/


let Account = function() {
  let invalidPassword = (pass) => userPassword !== pass;

  let makeDisplayName = () => {
    let name = ''

    while (name.length < 16) {
      let randStr = Math.random().toString(36).slice(2, 7);
      name += randStr.replace(/\d/g, '');
    }

    return name.slice(0, 16);
  };

  return function() {
    let userEmail;
    let userPassword;
    let userFirstName;
    let userLastName;

    init(email, password, fName, lName) {
      userEmail = email;
      userPassword = password;
      userFirstName = fName;
      userLastName = lName;
      this.displayName = makeDisplayName();
      return this;
    },


    reanonymize(password) {
      if (invalidPassword(password)) return "Invalid Password";
      this.displayName = makeDisplayName();
      return true;
    },

    resetPassword(password, newPassword) {
      if (invalidPassword(password)) return 'Invalid Password';
      userPassword = newPassword;
      return true;
    },

    firstName(password) {
      return invalidPassword(password) ? 'Invalid Password' : userFirstName;
    },

    lastName(password) {
      return invalidPassword(password) ? 'Invalid Password' : userLastName;
    },

    email(password) {
      return invalidPassword(password) ? 'Invalid Password' : userEmail;
    },
    };
}
}();

/*
  -reanonymize()
  -resetPass()
  -firstName()
  lName();
  email();
  displayName()

*/

// let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// console.log(fooBar.firstName);                     // returns the firstName function
// console.log(fooBar.email);                         // returns the email function
// console.log(fooBar.firstName('123456'));           // logs 'foo'
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.displayName);                   // logs 16 character sequence

// console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
// console.log(fooBar.resetPassword('123456', 'abc')) // logs true

// let displayName = fooBar.displayName;
// console.log(fooBar.reanonymize('abc'));                         // returns true
// console.log(displayName === fooBar.displayName);   // logs false

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'