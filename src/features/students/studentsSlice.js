import { createSlice } from '@reduxjs/toolkit';
import {
  addStudentAsync,
  deleteStudentAsync,
  fetchStudents,
  updateStudentAsync,
} from './studentsThunks';
import { studentsAdapter } from './studentsAdapter';

const studentsSlice = createSlice({
  name: 'students',
  initialState: studentsAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        studentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.addOne(state, action.payload);
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        studentsAdapter.removeOne(state, action.payload);
      });
  },
});

export default studentsSlice.reducer;
