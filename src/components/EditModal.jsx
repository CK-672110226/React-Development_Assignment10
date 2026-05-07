import { useEffect, useRef, useState } from 'react';

function EditModal({ student, majorOptions = [], onSave, onCancel }) {
  const [form, setForm] = useState({ ...student });
  const [error, setError] = useState('');
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === 'Escape') {
        onCancel();
      }
    }

    window.addEventListener('keydown', handleEscClose);
    return () => window.removeEventListener('keydown', handleEscClose);
  }, [onCancel]);

  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.studentId.trim()) {
      setError('Name and Student ID are required.');
      return;
    }

    const gpaNum = parseFloat(form.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      setError('GPA must be a number between 0.0 and 4.0.');
      return;
    }

    onSave({ ...form, gpa: gpaNum });
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Edit Student"
      onClick={onCancel}
    >
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <h3>Edit Student</h3>
        {error && <p className="form-error">{error}</p>}
        <input
          ref={nameInputRef}
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Full Name *"
        />
        <input
          name="studentId"
          value={form.studentId}
          onChange={onChange}
          placeholder="Student ID *"
        />
        {majorOptions.length > 0 ? (
          <select name="major" value={form.major || majorOptions[0]} onChange={onChange}>
            {majorOptions.map((major) => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        ) : (
          <input name="major" value={form.major} onChange={onChange} placeholder="Major" />
        )}
        <input
          name="gpa"
          value={form.gpa}
          onChange={onChange}
          type="number"
          step="0.01"
          min="0"
          max="4"
          placeholder="GPA"
        />
        <div className="modal-actions">
          <button type="button" className="btn-edit" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;