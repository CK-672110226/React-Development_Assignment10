import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectStudentById } from '../features/students/selectors';

function StudentRow({ studentId, rowNumber, onEdit, onDelete }) {
  const student = useSelector((state) => selectStudentById(state, studentId));

  if (!student) {
    return null;
  }

  return (
    <tr className={student.gpa >= 3.5 ? 'high-gpa' : ''}>
      <td>{rowNumber}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>
      <td>{student.major}</td>
      <td className={`gpa-cell ${student.gpa >= 3.5 ? 'gpa-high' : 'gpa-normal'}`}>
        {student.gpa.toFixed(2)}
      </td>
      <td>
        <button className="btn-edit" onClick={() => onEdit(studentId)}>
          Edit
        </button>{' '}
        <button className="btn-delete" onClick={() => onDelete(studentId)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default memo(StudentRow);
