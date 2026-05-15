import { describe, expect, it } from 'vitest';
import {
  selectAllStudents,
  selectAverageGpa,
  selectHighAchieverCount,
  selectHighAchievers,
  selectStudentById,
  selectStudentCount,
  selectStudentsIds,
  selectStudentsError,
  selectStudentsStatus,
  selectUniqueStudentMajors,
  makeSelectFilteredStudents,
} from './selectors';

const students = [
  { id: '1', name: 'A', studentId: '6501', major: 'CS', gpa: 3.8 },
  { id: '2', name: 'B', studentId: '6502', major: 'IT', gpa: 3.2 },
  { id: '3', name: 'C', studentId: '6503', major: 'CS', gpa: 3.5 },
];

const mockState = {
  students: {
    ids: ['1', '2', '3'],
    entities: {
      1: students[0],
      2: students[1],
      3: students[2],
    },
    status: 'succeeded',
    error: null,
  },
};

describe('students selectors', () => {
  it('selectStudentsStatus returns async status', () => {
    expect(selectStudentsStatus(mockState)).toBe('succeeded');
  });

  it('selectStudentsError returns async error', () => {
    expect(selectStudentsError(mockState)).toBeNull();
  });

  it('selectAllStudents returns student list', () => {
    expect(selectAllStudents(mockState)).toEqual(students);
  });

  it('selectStudentsIds returns student ids', () => {
    expect(selectStudentsIds(mockState)).toEqual(['1', '2', '3']);
  });

  it('selectStudentCount returns total students', () => {
    expect(selectStudentCount(mockState)).toBe(3);
  });

  it('selectAverageGpa returns formatted average', () => {
    expect(selectAverageGpa(mockState)).toBe('3.50');
  });

  it('selectHighAchievers returns students with GPA >= 3.5', () => {
    const high = selectHighAchievers(mockState);
    expect(high).toHaveLength(2);
    expect(high.every((student) => student.gpa >= 3.5)).toBe(true);
  });

  it('selectHighAchieverCount returns high achiever total', () => {
    expect(selectHighAchieverCount(mockState)).toBe(2);
  });

  it('selectStudentById returns matching student', () => {
    expect(selectStudentById(mockState, '2')).toEqual(students[1]);
  });

  it('selectUniqueStudentMajors returns sorted unique majors', () => {
    expect(selectUniqueStudentMajors(mockState)).toEqual(['CS', 'IT']);
  });

  it('makeSelectFilteredStudents returns filtered matches for explorer view', () => {
    const selectFilteredStudents = makeSelectFilteredStudents();
    expect(selectFilteredStudents(mockState, 'CS', 'gte3_5')).toEqual([students[0], students[2]]);
  });
});