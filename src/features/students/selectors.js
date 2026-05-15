import { createSelector } from '@reduxjs/toolkit';
import { studentsAdapter } from './studentsAdapter';

const studentsSelectors = studentsAdapter.getSelectors((state) => state.students);

export const selectStudentIds = studentsSelectors.selectIds;
export const selectStudentsIds = selectStudentIds;
export const selectStudentsEntities = studentsSelectors.selectEntities;
export const selectAllStudents = studentsSelectors.selectAll;
export const selectStudentById = (state, id) => studentsSelectors.selectById(state, String(id));
export const selectStudentCount = studentsSelectors.selectTotal;

export const selectStudentsStatus = (state) => state.students.status;
export const selectStudentsError = (state) => state.students.error;

export const selectUniqueStudentMajors = createSelector([selectAllStudents], (students) => {
  const majors = students
    .map((student) => (typeof student.major === 'string' ? student.major.trim() : ''))
    .filter(Boolean);

  return [...new Set(majors)].sort((left, right) => left.localeCompare(right));
});

export const selectAverageGpa = createSelector([selectAllStudents], (students) => {
  if (students.length === 0) return '0.00';

  const total = students.reduce((sum, student) => sum + student.gpa, 0);
  return (total / students.length).toFixed(2);
});

export const selectHighAchievers = createSelector(
  [selectAllStudents],
  (students) => students.filter((student) => student.gpa >= 3.5),
);

export const selectHighAchieverCount = createSelector(
  [selectHighAchievers],
  (highAchievers) => highAchievers.length,
);

export const makeSelectFilteredStudents = () =>
  createSelector(
    [selectAllStudents, (_, courseFilter) => courseFilter, (_, __, gpaFilter) => gpaFilter],
    (students, courseFilter, gpaFilter) =>
      students.filter((student) => {
        const major = typeof student.major === 'string' ? student.major.trim() : '';
        const passCourse = courseFilter === 'all' || major === courseFilter;

        let passGpa;
        switch (gpaFilter) {
          case 'gte3_5':
            passGpa = student.gpa >= 3.5;
            break;
          case '3_0_3_49':
            passGpa = student.gpa >= 3.0 && student.gpa < 3.5;
            break;
          case '2_0_2_99':
            passGpa = student.gpa >= 2.0 && student.gpa < 3.0;
            break;
          case 'lt2':
            passGpa = student.gpa < 2.0;
            break;
          default:
            passGpa = true;
            break;
        }

        return passCourse && passGpa;
      }),
  );