import { createSelector } from '@reduxjs/toolkit';

const selectStudentsList = (state) => state.students.list;
export const selectStudentsStatus = (state) => state.students.status;
export const selectStudentsError = (state) => state.students.error;

export const selectAllStudents = selectStudentsList;

export const selectStudentCount = createSelector(
  [selectStudentsList],
  (list) => list.length,
);

export const selectAverageGpa = createSelector([selectStudentsList], (list) => {
  if (list.length === 0) return '0.00';

  const total = list.reduce((sum, student) => sum + student.gpa, 0);
  return (total / list.length).toFixed(2);
});

export const selectStudentById = (id) => (state) =>
  state.students.list.find((student) => student.id === id);

export const selectHighAchievers = createSelector(
  [selectStudentsList],
  (list) => list.filter((student) => student.gpa >= 3.5),
);

export const selectHighAchieverCount = createSelector(
  [selectHighAchievers],
  (highAchievers) => highAchievers.length,
);