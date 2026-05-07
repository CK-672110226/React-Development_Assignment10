import { describe, expect, it } from 'vitest';
import studentsReducer from './studentsSlice';
import {
  addStudentAsync,
  deleteStudentAsync,
  fetchStudents,
  updateStudentAsync,
} from './studentsThunks';

describe('studentsSlice reducer', () => {
  it('returns expected initial state', () => {
    const state = studentsReducer(undefined, { type: '@@INIT' });

    expect(state.status).toBe('idle');
    expect(state.error).toBeNull();
    expect(state.list).toEqual([]);
  });

  it('handles fetchStudents pending and clears previous errors', () => {
    const previous = {
      list: [],
      status: 'idle',
      error: 'previous error',
    };

    const next = studentsReducer(previous, {
      type: fetchStudents.pending.type,
    });

    expect(next.status).toBe('loading');
    expect(next.error).toBeNull();
  });

  it('handles fetchStudents fulfilled by replacing list', () => {
    const previous = {
      list: [{ id: 'old-1', name: 'Old', studentId: '000', major: 'Old', gpa: 2.0 }],
      status: 'loading',
      error: null,
    };
    const payload = [
      { id: '1', name: 'New One', studentId: '6501001', major: 'CS', gpa: 3.8 },
      { id: '2', name: 'New Two', studentId: '6501002', major: 'IT', gpa: 3.4 },
    ];

    const next = studentsReducer(previous, {
      type: fetchStudents.fulfilled.type,
      payload,
    });

    expect(next.status).toBe('succeeded');
    expect(next.list).toEqual(payload);
  });

  it('handles fetchStudents rejected', () => {
    const previous = {
      list: [],
      status: 'loading',
      error: null,
    };

    const next = studentsReducer(previous, {
      type: fetchStudents.rejected.type,
      payload: 'Network error',
    });

    expect(next.status).toBe('failed');
    expect(next.error).toBe('Network error');
  });

  it('handles addStudentAsync fulfilled', () => {
    const previous = {
      list: [{ id: '1', name: 'A', studentId: '6501', major: 'CS', gpa: 3.1 }],
      status: 'succeeded',
      error: null,
    };
    const payload = {
      id: '2',
      name: 'B',
      studentId: '6502',
      major: 'IT',
      gpa: 3.6,
    };

    const next = studentsReducer(previous, {
      type: addStudentAsync.fulfilled.type,
      payload,
    });

    expect(next.list).toHaveLength(2);
    expect(next.list.at(-1)).toEqual(payload);
  });

  it('handles updateStudentAsync fulfilled', () => {
    const previous = {
      list: [{ id: '1', name: 'A', studentId: '6501', major: 'CS', gpa: 3.1 }],
      status: 'succeeded',
      error: null,
    };

    const next = studentsReducer(previous, {
      type: updateStudentAsync.fulfilled.type,
      payload: {
        id: '1',
        name: 'Updated Name',
        studentId: '6501',
        major: 'CS',
        gpa: 3.9,
      },
    });

    expect(next.list[0].name).toBe('Updated Name');
    expect(next.list[0].gpa).toBe(3.9);
  });

  it('handles deleteStudentAsync fulfilled', () => {
    const previous = {
      list: [
        { id: '1', name: 'A', studentId: '6501', major: 'CS', gpa: 3.1 },
        { id: '2', name: 'B', studentId: '6502', major: 'IT', gpa: 3.6 },
      ],
      status: 'succeeded',
      error: null,
    };

    const next = studentsReducer(previous, {
      type: deleteStudentAsync.fulfilled.type,
      payload: '1',
    });

    expect(next.list).toHaveLength(1);
    expect(next.list[0].id).toBe('2');
  });
});