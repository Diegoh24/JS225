// /*
// superclass: person
//   - firstName
//   - lastName
//   - age
//   - gender
//   - fullName()
//   - communicate()
//   - eat()
//   - sleep()

// - 3 inheriting classes:
//   - doctor is a pesson
//     - specialization prop
//     - diagnose()
//   - professor is a person
//     - subject property
//     - teach()
//   - student is a person
//     - degree property
//     - study()

//     - subclass of student: Grad student is a student:
//       - graduateDegree() method
//       - research()

// */



// /*
// superclass: person
//   - firstName
//   - lastName
//   - age
//   - gender
//   - fullName()
//   - communicate()
//   - eat()
//   - sleep()
// */

// function Person(firstName, lastName, age, gender) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.age = age;
//   this.gender = gender;
// }

// Person.prototype.fullName = function() {
//   return this.firstName + ' ' + this.lastName;
// }

// Person.prototype.communicate = function() {
//   console.log('communicating');
// }

// Person.prototype.eat = function() {
//   console.log('eating');
// }

// Person.prototype.sleep = function() {
//   console.log('sleeping');
// }

// function Doctor(fName, lName, age, gender, specialization) {
//   Person.call(this, fName, lName, age, gender);
//   this.specialization = specialization;
// }

// Doctor.prototype = Object.create(Person.prototype);
// Doctor.prototype.constructor = Doctor;

// Doctor.prototype.diagnose = function() {
//   console.log('diagnosing');
// }

// function Professor(fName, lName, age, gender, subject) {
//   Person.call(this, fName, lName, age, gender);
//   this.subject = subject;
// }

// Professor.prototype = Object.create(Person.prototype);
// Professor.prototype.constructor = Professor;

// Professor.prototype.teach = function() {
//   console.log('teaching');
// }

// function Student(fName, lName, age, gender, degree) {
//   Person.call(this, fName, lName, age, gender);
//   this.degree = degree;
// }

// Student.prototype = Object.create(Person.prototype);
// Student.prototype.constructor = Student;

// Student.prototype.study = function() {
//   console.log('Studying');
// }

// function GraduateStudent(fName, lName, age, gender, bsDegree, msDegree) {
//   Student.call(this, fName, lName, age, gender);
//   this.bsDegree = bsDegree;
//   this.msDegree = msDegree;
// }

// GraduateStudent.prototype = Object.create(Student.prototype);
// GraduateStudent.prototype.constructor = GraduateStudent;

// GraduateStudent.prototype.research = function() {
//   console.log('researching');
// }

// const person = new Person('foo', 'bar', 21, 'gender');
// console.log(person instanceof Person);     // logs true
// person.eat();                              // logs 'Eating'
// person.communicate();                      // logs 'Communicating'
// person.sleep();                            // logs 'Sleeping'
// console.log(person.fullName());            // logs 'foo bar'

// const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
// console.log(doctor instanceof Person);     // logs true
// console.log(doctor instanceof Doctor);     // logs true
// doctor.eat();                              // logs 'Eating'
// doctor.communicate();                      // logs 'Communicating'
// doctor.sleep();                            // logs 'Sleeping'
// console.log(doctor.fullName());            // logs 'foo bar'
// doctor.diagnose();                         // logs 'Diagnosing'

// const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// // logs true for next three statements
// console.log(graduateStudent instanceof Person);
// console.log(graduateStudent instanceof Student);
// console.log(graduateStudent instanceof GraduateStudent);
// graduateStudent.eat();                     // logs 'Eating'
// graduateStudent.communicate();             // logs 'Communicating'
// graduateStudent.sleep();                   // logs 'Sleeping'
// console.log(graduateStudent.fullName());   // logs 'foo bar'
// graduateStudent.study();                   // logs 'Studying'
// graduateStudent.research();                // logs 'Researching'


/*
superclass: person
  - firstName
  - lastName
  - age
  - gender
  - fullName()
  - communicate()
  - eat()
  - sleep()

- 3 inheriting classes:
  - doctor is a pesson
    - specialization prop
    - diagnose()
  - professor is a person
    - subject property
    - teach()
  - student is a person
    - degree property
    - study()

    - subclass of student: Grad student is a student:
      - graduateDegree() method
      - research()

*/



/*
superclass: person
  - firstName
  - lastName
  - age
  - gender
  - fullName()
  - communicate()
  - eat()
  - sleep()
*/

class Person {
  constructor(fName, lName, age, gender) {
    this.fName = fName
    this.lName = lName;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return this.fName + ' '+  this.lName;
  }

  communicate() {
    console.log('communicating');
  }

  eat() {
    console.log('eating');
  }

  sleep() {
    console.log('sleeping');
  }

}

class Doctor extends Person {
  constructor(fName, lName, age, gender, specialization) {
    super(fName, lName, age, gender);
    this.specialization = specialization;
  }

  diagnose() {
    console.log('diagnosing');
  }
}

class Professor extends Person {
  constructor(fName, lName, age, gender, subject) {
    super(fName, lName, age, gender)
    this.subject = subject;
  }

  teach() {
    console.log('teaching');
  }
}

let Student = class extends Person {
  constructor(fName, lName, age, gender, degree) {
    super(fName, lName, age, gender);
    this.degree = degree;
  }

  study() {
    console.log('studing');
  }
}

class GraduateStudent extends Student {
  constructor(fName, lName, age, gender, bsDegree, msDegree) {
    super(fName, lName, age, gender);
    this.bsDegree = bsDegree;
    this.msDegree = bsDegree;
  }

  research() {
    console.log('researching');
  }
}

const person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'



/*

anonymizer
OLOO pattern

*/

let Account = (function() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  let makeDisplayName = () => {
    let name = ''

    while (name.length < 16) {
      let randStr = Math.random().toString(36).slice(2, 7);
      name += randStr.replace(/\d/g, '');
    }

    return name.slice(0, 16);
  };

  return {
    init(email, pass, fName, lName) {
      userEmail = email;
      userPassword = pass;
      userFirstName = fName;
      userLastName = lName;
      this.displayName = makeDisplayName()
    },

    reanonymize(pass) {
     if (userPassword !== pass) return 'Invalid Password';
     this.displayName = makeDisplayName();
    },

    resetPassword(pass) {
      if (userPassword !== pass) return 'invalid Password';
      userPassword = pass;
    },

    firstName(pass) {
      if (userPassword !== pass) return 'Invalid Password';
      return userFirstName;
    },

    lastName(pass) {
      if (userPassword !== pass) return 'Invalid Password';
      return userLastName;
    },

    email(pass) {
      if (userPassword !== pass) return 'invalid Password';
      return userEmail;
    },
  };
})();