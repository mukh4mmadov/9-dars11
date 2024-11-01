import { configureStore } from '@reduxjs/toolkit';
import studentsSlice from './studentsSlice';

export const store = configureStore({
  reducer: {
    students: studentsSlice,
  },
});

export default store;
