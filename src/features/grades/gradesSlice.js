import { createSlice } from '@reduxjs/toolkit';
import { gradesAdapter } from './gradesAdapter';

const gradesSlice = createSlice({
  name: 'grades',
  initialState: gradesAdapter.getInitialState(),
  reducers: {
    addGrade: (state, action) => {
      gradesAdapter.addOne(state, {
        id: Date.now(),
        ...action.payload,
      });
    },
    updateGrade: (state, action) => {
      gradesAdapter.upsertOne(state, action.payload);
    },
    deleteGrade: (state, action) => {
      gradesAdapter.removeOne(state, String(action.payload));
    },
  },
});

export const { addGrade, updateGrade, deleteGrade } = gradesSlice.actions;
export default gradesSlice.reducer;
