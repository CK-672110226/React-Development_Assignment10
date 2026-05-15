import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from './EditModal';
import {
  selectStudentIds,
  selectStudentsError,
  selectStudentsStatus,
} from '../features/students/selectors';
import {
  deleteStudentAsync,
  fetchMajorsFromCoursesApi,
  fetchStudents,
  updateStudentAsync,
} from '../features/students/studentsThunks';
import StudentRow from './StudentRow';

function StudentTable() {
  const dispatch = useDispatch();
  const studentIds = useSelector(selectStudentIds);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [majorOptions, setMajorOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadMajors() {
      const majors = await fetchMajorsFromCoursesApi();
      if (!isMounted) return;
      setMajorOptions(majors);
    }

    loadMajors();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Delete this student?')) {
      dispatch(deleteStudentAsync(id));
    }
  }, [dispatch]);

  const handleEdit = useCallback((id) => {
    setEditingStudentId(id);
  }, []);

  async function handleEditSave(updatedData) {
    if (!updatedData.name.trim() || !updatedData.studentId.trim()) {
      return;
    }

    const gpaNum = parseFloat(updatedData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      return;
    }

    try {
      const normalizedMajor = updatedData.major.trim() || majorOptions[0] || 'Undeclared';

      await dispatch(updateStudentAsync({
        ...updatedData,
        name: updatedData.name.trim(),
        studentId: updatedData.studentId.trim(),
        major: normalizedMajor,
        gpa: gpaNum,
      })).unwrap();
      setEditingStudentId(null);
    } catch {
      // Keep modal open so user can retry after a transient API error.
    }
  }

  if (status === 'loading') {
    return <div className="spinner">Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="error-banner">
        <p>Error: {error}</p>
        <button type="button" className="btn-primary" onClick={() => dispatch(fetchStudents())}>
          Retry
        </button>
      </div>
    );
  }

  if (status !== 'succeeded') {
    return null;
  }

  if (studentIds.length === 0) {
    return <p className="empty-state">No students yet. Add one above!</p>;
  }

  return (
    <>
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Major</th>
            <th>GPA</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {studentIds.map((studentId, index) => (
            <StudentRow
              key={studentId}
              studentId={studentId}
              rowNumber={index + 1}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      {editingStudentId && (
        <EditModal
          key={editingStudentId}
          studentId={editingStudentId}
          majorOptions={majorOptions}
          onSave={handleEditSave}
          onCancel={() => setEditingStudentId(null)}
        />
      )}
    </>
  );
}

export default StudentTable;
