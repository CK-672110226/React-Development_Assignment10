import { createSlice } from '@reduxjs/toolkit';
import {
  addStudentAsync,
  deleteStudentAsync,
  fetchStudents,
  updateStudentAsync,
} from './studentsThunks';

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        const idx = state.list.findIndex((student) => student.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((student) => student.id !== action.payload);
      });
  },
});

export default studentsSlice.reducer;
