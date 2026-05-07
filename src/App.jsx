import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';
import StudentTable from './components/StudentTable';
import DataExplorerPage from './pages/DataExplorerPage';
import { fetchStudents } from './features/students/studentsThunks';

const THEME_STORAGE_KEY = 'academate-theme';

function App() {
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState('dashboard');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
        </button>
        <h1>AcadeMate</h1>
        <div className="view-switcher">
          <button
            type="button"
            className={`view-switch-btn ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`view-switch-btn ${activeView === 'explorer' ? 'active' : ''}`}
            onClick={() => setActiveView('explorer')}
          >
            Data Explorer
          </button>
        </div>
      </header>
      <main className="app-main">
        {activeView === 'dashboard' ? (
          <>
            <GpaSummary />
            <AddStudentForm />
            <StudentTable />
          </>
        ) : (
          <DataExplorerPage />
        )}
      </main>
    </div>
  );
}

export default App;
