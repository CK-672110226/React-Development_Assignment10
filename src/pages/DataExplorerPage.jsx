import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllStudents } from '../features/students/selectors';

const GPA_FILTERS = [
  { value: 'all', label: 'All GPA' },
  { value: 'gte3_5', label: '>= 3.5' },
  { value: '3_0_3_49', label: '3.0 - 3.49' },
  { value: '2_0_2_99', label: '2.0 - 2.99' },
  { value: 'lt2', label: '< 2.0' },
];

function matchesGpaFilter(gpa, filter) {
  switch (filter) {
    case 'gte3_5':
      return gpa >= 3.5;
    case '3_0_3_49':
      return gpa >= 3.0 && gpa < 3.5;
    case '2_0_2_99':
      return gpa >= 2.0 && gpa < 3.0;
    case 'lt2':
      return gpa < 2.0;
    default:
      return true;
  }
}

function DataExplorerPage() {
  const students = useSelector(selectAllStudents);
  const [courseFilter, setCourseFilter] = useState('all');
  const [gpaFilter, setGpaFilter] = useState('all');

  const courseOptions = useMemo(() => {
    const uniqueMajors = [...new Set(
      students
        .map((student) => (typeof student.major === 'string' ? student.major.trim() : ''))
        .filter(Boolean),
    )].sort((a, b) => a.localeCompare(b));

    return ['all', ...uniqueMajors];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const major = typeof student.major === 'string' ? student.major.trim() : '';
      const passCourse = courseFilter === 'all' || major === courseFilter;
      const passGpa = matchesGpaFilter(student.gpa, gpaFilter);
      return passCourse && passGpa;
    });
  }, [students, courseFilter, gpaFilter]);

  return (
    <section className="data-explorer">
      <div className="data-explorer-header">
        <h2>Data Explorer</h2>
        <p>Filter students by course name and GPA range.</p>
      </div>

      <div className="explorer-controls">
        <label>
          Course Name
          <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            {courseOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Courses' : option}
              </option>
            ))}
          </select>
        </label>

        <label>
          GPA
          <select value={gpaFilter} onChange={(e) => setGpaFilter(e.target.value)}>
            {GPA_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="explorer-meta">
        Showing {filteredStudents.length} of {students.length} students
      </div>

      {filteredStudents.length === 0 ? (
        <p className="empty-state">No students match this filter.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Student ID</th>
              <th>Course Name</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id} className={student.gpa >= 3.5 ? 'high-gpa' : ''}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.studentId}</td>
                <td>{student.major}</td>
                <td className={`gpa-cell ${student.gpa >= 3.5 ? 'gpa-high' : 'gpa-normal'}`}>
                  {student.gpa.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default DataExplorerPage;
