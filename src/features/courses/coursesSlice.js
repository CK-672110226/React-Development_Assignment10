import { createSlice } from '@reduxjs/toolkit';
import { coursesAdapter } from './coursesAdapter';

const INITIAL_COURSES = [
  { id: 1, code: 'CS101', title: 'Data Structures', credits: 3, dept: 'CS' },
  { id: 2, code: 'AI201', title: 'AI Fundamentals', credits: 3, dept: 'CS' },
  { id: 3, code: 'WD301', title: 'Web Development', credits: 3, dept: 'IT' },
  { id: 4, code: 'NS401', title: 'Network Security', credits: 3, dept: 'IT' },
];

const coursesSlice = createSlice({
  name: 'courses',
  initialState: coursesAdapter.setAll(coursesAdapter.getInitialState(), INITIAL_COURSES),
  reducers: {
    addCourse: (state, action) => {
      coursesAdapter.addOne(state, action.payload);
    },
    deleteCourse: (state, action) => {
      coursesAdapter.removeOne(state, String(action.payload));
    },
  },
});

export const { addCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
