import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectAllStudents } from './selectors';

const STUDENTS_API_URL = import.meta.env.VITE_STUDENTS_API_URL;
const COURSES_API_URL = import.meta.env.VITE_COURSES_API_URL;
const LOCAL_STUDENTS_KEY = 'academate-local-students';

const LOCAL_SEED_STUDENTS = [
  { id: '1', name: 'Somchai Rakpong', studentId: '6501001', major: 'Computer Science', gpa: 3.85 },
  { id: '2', name: 'Naree Thongdee', studentId: '6501002', major: 'Information Technology', gpa: 3.6 },
  { id: '3', name: 'Krit Suwan', studentId: '6501003', major: 'Computer Science', gpa: 2.95 },
  { id: '4', name: 'Malee Jaikaew', studentId: '6501004', major: 'Business IT', gpa: 3.4 },
  { id: '5', name: 'Pong Srisuk', studentId: '6501005', major: 'Information Technology', gpa: 3.75 },
];

function normalizeStudent(student) {
  const gpaNum = Number(student.gpa);
  return {
    ...student,
    id: String(student.id),
    major: typeof student.major === 'string' && student.major.trim() ? student.major : 'Undeclared',
    gpa: Number.isFinite(gpaNum) ? gpaNum : 0,
  };
}

function hashString(value) {
  const text = String(value ?? '');
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickMajorByStudentId(student, majors) {
  if (!majors.length) {
    return typeof student.major === 'string' && student.major.trim()
      ? student.major.trim()
      : 'Undeclared';
  }

  const source = student.studentId || student.id;
  const index = hashString(source) % majors.length;
  return majors[index];
}

function randomGpaFromIdMajor(id, major) {
  const hash = hashString(`${id}:${major}`);
  const value = 2 + ((hash % 201) / 100);
  return Number(value.toFixed(2));
}

function mergeWithReducerGpa(student, currentStudents, majors) {
  const normalized = normalizeStudent({
    ...student,
    major: pickMajorByStudentId(student, majors),
  });

  const found = currentStudents.find(
    (item) => String(item.id) === normalized.id && item.major === normalized.major,
  );

  return {
    ...normalized,
    gpa: found ? found.gpa : randomGpaFromIdMajor(normalized.id, normalized.major),
  };
}

function shouldUseLocalFallback() {
  if (!STUDENTS_API_URL) return true;
  return STUDENTS_API_URL.includes('your-project-id.mockapi.io');
}

function readLocalStudents() {
  const raw = localStorage.getItem(LOCAL_STUDENTS_KEY);
  if (!raw) {
    localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(LOCAL_SEED_STUDENTS));
    return LOCAL_SEED_STUDENTS.map(normalizeStudent);
  }

  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
      localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(LOCAL_SEED_STUDENTS));
      return LOCAL_SEED_STUDENTS.map(normalizeStudent);
    }
    return data.map(normalizeStudent);
  } catch {
    localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(LOCAL_SEED_STUDENTS));
    return LOCAL_SEED_STUDENTS.map(normalizeStudent);
  }
}

function writeLocalStudents(students) {
  localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(students));
}

async function parseErrorMessage(response, fallbackMessage) {
  try {
    const data = await response.json();
    if (typeof data?.message === 'string' && data.message.trim()) {
      return data.message;
    }
  } catch {
    // Ignore invalid JSON error payloads and use fallback message.
  }

  return fallbackMessage;
}

async function request(path = '', options = {}) {
  const response = await fetch(`${STUDENTS_API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const fallback = `Request failed (${response.status})`;
    throw new Error(await parseErrorMessage(response, fallback));
  }

  return response;
}

export const fetchMajorsFromCoursesApi = async () => {
  if (!COURSES_API_URL) return [];

  try {
    const response = await fetch(COURSES_API_URL);
    if (!response.ok) return [];

    const data = await response.json();
    if (!Array.isArray(data)) return [];

    return [...new Set(
      data
        .map((item) => (typeof item?.major === 'string' ? item.major.trim() : ''))
        .filter(Boolean),
    )];
  } catch {
    return [];
  }
};

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const majors = await fetchMajorsFromCoursesApi();
      const currentStudents = selectAllStudents(getState());

      if (shouldUseLocalFallback()) {
        return readLocalStudents().map((student) =>
          mergeWithReducerGpa(student, currentStudents, majors),
        );
      }

      const response = await request();
      const data = await response.json();
      return Array.isArray(data)
        ? data.map((student) => mergeWithReducerGpa(student, currentStudents, majors))
        : [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch students');
    }
  },
);

export const addStudentAsync = createAsyncThunk(
  'students/addStudentAsync',
  async (studentData, { rejectWithValue }) => {
    try {
      if (shouldUseLocalFallback()) {
        const students = readLocalStudents();
        const newStudent = normalizeStudent({
          ...studentData,
          id: String(Date.now()),
        });
        const next = [...students, newStudent];
        writeLocalStudents(next);
        return newStudent;
      }

      const { gpa, ...apiPayload } = studentData;

      const response = await request('', {
        method: 'POST',
        body: JSON.stringify(apiPayload),
      });
      const data = await response.json();
      return normalizeStudent({ ...data, gpa });
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add student');
    }
  },
);

export const updateStudentAsync = createAsyncThunk(
  'students/updateStudentAsync',
  async (studentData, { rejectWithValue }) => {
    try {
      if (shouldUseLocalFallback()) {
        const students = readLocalStudents();
        const updated = normalizeStudent(studentData);
        const next = students.map((student) =>
          student.id === updated.id ? updated : student,
        );
        writeLocalStudents(next);
        return updated;
      }

      const { gpa, ...apiPayload } = studentData;

      const response = await request(`/${studentData.id}`, {
        method: 'PUT',
        body: JSON.stringify(apiPayload),
      });
      const data = await response.json();
      return normalizeStudent({ ...data, gpa });
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update student');
    }
  },
);

export const deleteStudentAsync = createAsyncThunk(
  'students/deleteStudentAsync',
  async (id, { rejectWithValue }) => {
    try {
      const normalizedId = String(id);
      if (shouldUseLocalFallback()) {
        const students = readLocalStudents();
        const next = students.filter((student) => student.id !== normalizedId);
        writeLocalStudents(next);
        return normalizedId;
      }

      await request(`/${id}`, { method: 'DELETE' });
      return normalizedId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete student');
    }
  },
);
