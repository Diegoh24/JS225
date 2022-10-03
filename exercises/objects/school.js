function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        if (course.note) {
          course.note += `; ${note}`;
        } else {
          course.note = note;
        }
      }

    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        course.note = note;
      }
    },
  };
}

let school = {
  students: [],

  addStudent(student) {
    if (this.invalidYear(student.year)) {
      console.log('Invalid Year');
      return;
    }
    this.students.push(student);
  },

  invalidYear(year) {
    return !['1st', '2nd', '3rd', '4th', '5th'].includes(year);
  },

  enrollStudent(course, student) {
    student.addCourse(course);
  },

  addGrade(student, code, grade) {
    let course = student.courses.filter(course => course.code === code).shift();
    course.grade = grade;
  },

  getReportCard(student) {
    student.courses.forEach(course => console.log(course.name + ':', course.grade));
  },

  courseReport(name) {
    console.log('=' + name + ' Grades' + '=');
    let courseGrades = this.students.reduce((grades, student) => {
      let course = student.courses.filter(course => {
        return course.name === name;
      }).shift();

      console.log(student.name + ':', course.grade);
      grades.push(course.grade);
      return grades
    }, []);

    let avg = courseGrades.reduce((sum, grade) => sum + grade) / courseGrades.length;
    console.log('---');
    console.log('Course Average', avg);
  }
}

let foo = createStudent('foo', '3rd');
foo.addCourse({ name: 'Math', code: 101});
foo.addCourse({ name: 'Advanced Math', code: 102});
school.addStudent(foo);
school.addGrade(foo, 101, 95);
school.addGrade(foo, 102, 99);

school.enrollStudent({ name: 'Physics', code: 202, }, foo);
school.addGrade(foo, 202, 91);


let bar = createStudent('bar', '1st');
school.addStudent(bar);
school.enrollStudent({ name: 'Advanced Math', code: 102}, bar);
school.enrollStudent({ name: 'Math', code: 101}, bar);
school.enrollStudent({ name: 'Physics', code: 202, }, bar);
school.addGrade(bar, 101, 80);
school.addGrade(bar, 102, 85);
school.addGrade(bar, 202, 90);

school.getReportCard(bar);

school.courseReport('Math');