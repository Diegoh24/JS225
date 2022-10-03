function createStudent(name, grade) {
  let courses = []
  let notes = []

  function findCourse(code) {
    return courses.filter(course => course.code === code).shift();
  }

  function findCourseNotes(name) {
    return notes.filter(notes => notes.courseName === name).shift();
  }

  return {
    info() {
      console.log(name + 'is a ' + grade + 'year student');
    },

    addCourse(name, code) {
      courses.push({name, code,});
    },

    listCourses() {
      console.log(courses);
    },

    viewNotes() {
      notes.forEach(({courseName, notes}) => console.log(courseName + ':', notes.join('; ')));
    },

    addNote(code, note) {
      let courseName = findCourse(code).name;
      let courseNotes = findCourseNotes(courseName)

      if (courseNotes) {
        courseNotes.notes.push(note);
      } else {
        notes.push({courseName, notes: [note]});
      }
    },

    updateNote(code, note) {
      let courseName = findCourse(code).name;
      let courseNotes = findCourseNotes(courseName);

      courseNotes.notes = [note];
    },
  };
}

let foo = createStudent('Foo', '1st');

console.log(foo);
foo.listCourses();

foo.addCourse('Math', 101);
foo.addCourse('Advanced Math', 102);
foo.listCourses();

foo.addNote(101, 'Fun Course');
foo.addNote(101, 'Remember to study for algebra');
foo.addNote(102, 'Difficult Subject');


// foo.viewNotes();

foo.updateNote(101, 'Fun course');
foo.viewNotes();