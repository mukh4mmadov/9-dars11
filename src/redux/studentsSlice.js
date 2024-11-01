import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [
    { id: 1, name: "Ali", age: 18 },
    { id: 2, name: "Vali", age: 20 }
  ]
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const { id, name, age } = action.payload;
      const student = state.students.find(student => student.id === id);
      if (student) {
        student.name = name;
        student.age = age;
      }
    },
    deleteStudent: (state, action) => {
      const id = action.payload;
      state.students = state.students.filter(student => student.id !== id);
    },
    clearAllStudents: (state) => {
      state.students = [];
    },
    updateStudentAge: (state, action) => {
      const { id, age } = action.payload;
      const student = state.students.find(student => student.id === id);
      if (student) {
        student.age = age;
      }
    },
    updateStudentName: (state, action) => {
      const { id, name } = action.payload;
      const student = state.students.find(student => student.id === id);
      if (student) {
        student.name = name;
      }
    }
  }
});

export const { addStudent, updateStudent, deleteStudent, clearAllStudents, updateStudentAge, updateStudentName } = studentsSlice.actions;

export default studentsSlice.reducer;
