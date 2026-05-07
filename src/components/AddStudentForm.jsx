import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addStudentAsync,
  fetchMajorsFromCoursesApi,
} from '../features/students/studentsThunks';

const EMPTY_FORM = { name: '', studentId: '', major: '', gpa: '' };

function AddStudentForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [majorOptions, setMajorOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadMajors() {
      const majors = await fetchMajorsFromCoursesApi();
      if (!isMounted) return;

      setMajorOptions(majors);
      if (majors.length > 0) {
        setForm((prev) => (prev.major ? prev : { ...prev, major: majors[0] }));
      }
    }

    loadMajors();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.studentId.trim()) {
      setError('Name and Student ID are required.');
      return;
    }

    const gpaNum = parseFloat(form.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      setError('GPA must be a number between 0.0 and 4.0.');
      return;
    }

    const normalizedMajor = form.major.trim() || majorOptions[0] || 'Undeclared';

    try {
      await dispatch(addStudentAsync({
        name: form.name.trim(),
        studentId: form.studentId.trim(),
        major: normalizedMajor,
        gpa: gpaNum,
      })).unwrap();

      setForm({ ...EMPTY_FORM, major: majorOptions[0] || '' });
      setError('');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to add student.');
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <input
          name="name"
          placeholder="Full Name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="studentId"
          placeholder="Student ID *"
          value={form.studentId}
          onChange={handleChange}
          required
        />
        {majorOptions.length > 0 ? (
          <select name="major" value={form.major || majorOptions[0]} onChange={handleChange}>
            {majorOptions.map((major) => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        ) : (
          <input
            name="major"
            placeholder="Major"
            value={form.major}
            onChange={handleChange}
          />
        )}
        <input
          name="gpa"
          placeholder="GPA (0.0–4.0)"
          value={form.gpa}
          onChange={handleChange}
          type="number"
          step="0.01"
          min="0"
          max="4"
        />
        <button type="submit" className="btn-primary">+ Add Student</button>
      </div>
    </form>
  );
}

export default AddStudentForm;
