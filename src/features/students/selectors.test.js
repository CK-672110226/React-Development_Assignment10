import { describe, expect, it } from 'vitest';
import {
  selectAllStudents,
  selectAverageGpa,
  selectHighAchieverCount,
  selectHighAchievers,
  selectStudentById,
  selectStudentCount,
  selectStudentsError,
  selectStudentsStatus,
} from './selectors';

const mockState = {
  students: {
    status: 'succeeded',
    error: null,
    list: [
      { id: 1, name: 'A', studentId: '6501', major: 'CS', gpa: 3.8 },
      { id: 2, name: 'B', studentId: '6502', major: 'IT', gpa: 3.2 },
      { id: 3, name: 'C', studentId: '6503', major: 'CS', gpa: 3.5 },
    ],
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
    expect(selectAllStudents(mockState)).toEqual(mockState.students.list);
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
    expect(selectStudentById(2)(mockState)).toEqual(mockState.students.list[1]);
  });
});