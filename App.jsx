import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import { useStudents } from './context/StudentContext'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import Progress from './pages/Progress'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import './App.css'

function Dashboard() {
  const { students } = useStudents()

  const totalStudents = students.length
  const presentCount = students.filter(
    (student) => student.status === 'Present'
  ).length

  const attendancePercentage = totalStudents
    ? Math.round((presentCount / totalStudents) * 100)
    : 0

  const averageProgress = totalStudents
    ? Math.round(
        students.reduce(
          (total, student) => total + (Number(student.marks) || 0),
          0
        ) / totalStudents
      )
    : 0

  return (
    <div>
      <section className="welcome">
        <div>
          <h2>Every learner matters! 🌟</h2>
          <p>Manage students, track attendance and celebrate progress.</p>
        </div>
        <span className="welcome-icon">🎓</span>
      </section>

      <section className="stats">
        <div className="stat-card purple">
          <span>👩‍🎓</span>
          <p>Total Students</p>
          <h2>{totalStudents}</h2>
        </div>

        <div className="stat-card green">
          <span>📅</span>
          <p>Attendance Today</p>
          <h2>{attendancePercentage}%</h2>
        </div>

        <div className="stat-card orange">
          <span>📈</span>
          <p>Average Progress</p>
          <h2>{averageProgress}%</h2>
        </div>
      </section>

      <h2 className="section-title">Quick Access</h2>

      <section className="cards">
        <NavLink className="card" to="/students">
          <span className="card-icon">👩‍🎓</span>
          <h2>Students</h2>
          <p>Manage student records</p>
          <span className="card-link">Open page →</span>
        </NavLink>

        <NavLink className="card" to="/attendance">
          <span className="card-icon">📅</span>
          <h2>Attendance</h2>
          <p>Track daily attendance</p>
          <span className="card-link">Open page →</span>
        </NavLink>

        <NavLink className="card" to="/progress">
          <span className="card-icon">📊</span>
          <h2>Progress</h2>
          <p>Monitor student performance</p>
          <span className="card-link">Open page →</span>
        </NavLink>
      </section>
    </div>
  )
}

function AdminLayout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>📚 LearnHub</h2>
        <p className="tagline">Community Learning</p>

        <nav>
          <NavLink to="/" end>🏠 Dashboard</NavLink>
          <NavLink to="/students">👩‍🎓 Students</NavLink>
          <NavLink to="/attendance">📅 Attendance</NavLink>
          <NavLink to="/progress">📊 Progress</NavLink>
        </nav>

        <div className="sidebar-bottom">
          <p>Learn • Track • Grow</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Community Learning Portal</h1>
            <p>Welcome back! Here's your learning overview.</p>
          </div>

          <NavLink to="/login" className="profile">
            ↪ Logout
          </NavLink>
        </header>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </div>

        <footer>Community Learning Portal © 2026</footer>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App