import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from './EditModal';
import {
  selectAllStudents,
  selectStudentsError,
  selectStudentsStatus,
} from '../features/students/selectors';
import {
  deleteStudentAsync,
  fetchMajorsFromCoursesApi,
  fetchStudents,
  updateStudentAsync,
} from '../features/students/studentsThunks';

function StudentTable() {
  const dispatch = useDispatch();
  const students = useSelector(selectAllStudents);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);
  const [editing, setEditing] = useState(null);
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

  function handleDelete(id) {
    if (window.confirm('Delete this student?')) {
      dispatch(deleteStudentAsync(id));
    }
  }

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
      setEditing(null);
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

  if (students.length === 0) {
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
          {students.map((student, index) => (
            <tr key={student.id} className={student.gpa >= 3.5 ? 'high-gpa' : ''}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td>{student.major}</td>
              <td className={`gpa-cell ${student.gpa >= 3.5 ? 'gpa-high' : 'gpa-normal'}`}>
                {student.gpa.toFixed(2)}
              </td>
              <td>
                <button className="btn-edit" onClick={() => setEditing(student)}>
                  Edit
                </button>{' '}
                <button className="btn-delete" onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <EditModal
          student={editing}
          majorOptions={majorOptions}
          onSave={handleEditSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default StudentTable;
