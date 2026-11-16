import { useState } from 'react'
import { BrowserRouter, NavLink, Routes, Route, useParams } from 'react-router-dom'
import { useStudents } from './useStudents'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import Progress from './pages/Progress'
import Records from './pages/Records'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import './App.css'

const classLearningContent = {
  1: {
    subject: 'Mathematics',
    title: 'Counting and number patterns',
    description: 'Count objects in groups and notice how numbers grow when you count by 2s, 5s, or 10s.',
    activity: 'Count 20 objects around you, then group them in tens.',
  },
  2: {
    subject: 'English',
    title: 'Build a story',
    description: 'A story has a beginning, a middle, and an ending. These parts help readers follow what happens.',
    activity: 'Draw three pictures showing the beginning, middle, and end of a story.',
  },
  3: {
    subject: 'Mathematics',
    title: 'Multiplication as equal groups',
    description: 'Multiplication is a quick way to add equal groups, such as 4 groups of 3.',
    activity: 'Draw 5 groups with 4 dots in each group and write the multiplication sentence.',
  },
  4: {
    subject: 'Science',
    title: 'Habitats and living things',
    description: 'A habitat gives plants and animals the food, water, and shelter they need.',
    activity: 'Choose an animal and list three things its habitat provides.',
  },
  5: {
    subject: 'English',
    title: 'Find the main idea',
    description: 'The main idea tells what a passage is mostly about. Details help explain it.',
    activity: 'Read a short paragraph and write its main idea in one sentence.',
  },
  6: {
    subject: 'Mathematics',
    title: 'Fractions in everyday life',
    description: 'Fractions describe equal parts of a whole. The denominator tells how many equal parts there are.',
    activity: 'Draw a shape split into 8 equal parts and shade 3/8.',
  },
  7: {
    subject: 'Science',
    title: 'The water cycle',
    description: 'Water moves through evaporation, condensation, and precipitation in a repeating cycle.',
    activity: 'Draw the water cycle and label each of its three stages.',
  },
  8: {
    subject: 'Mathematics',
    title: 'Ratios around us',
    description: 'A ratio compares amounts, such as 2 red objects for every 3 blue objects.',
    activity: 'Find two groups of objects and write a ratio to compare them.',
  },
  9: {
    subject: 'Science',
    title: 'Energy in an ecosystem',
    description: 'Plants capture energy from sunlight, and that energy passes through food chains.',
    activity: 'Create a simple food chain with a plant, an animal, and a predator.',
  },
  10: {
    subject: 'Mathematics',
    title: 'Solve a simple equation',
    description: 'An equation stays balanced when the same operation is done to both sides.',
    activity: 'Solve x + 7 = 15, then check your answer by substituting it for x.',
  },
}

function ContentPage() {
  return (
    <section className="content-page" aria-labelledby="content-page-title">
      <div className="page-heading">
        <div>
          <h1 id="content-page-title">CONTENT</h1>
          <p>Choose a class to explore its starter lesson and activity.</p>
        </div>
      </div>
      <div className="class-button-grid" aria-label="Choose a class">
        {Array.from({ length: 10 }, (_, index) => (
          <NavLink
            className="class-button"
            to={`/content/${index + 1}`}
            key={index + 1}
          >
            Class {index + 1}
          </NavLink>
        ))}
      </div>
    </section>
  )
}

function readClassContent(classNumber) {
  try {
    const savedContent = localStorage.getItem(`classContent-${classNumber}`)
    return {
      entries: savedContent === null ? [] : JSON.parse(savedContent),
      error: '',
    }
  } catch {
    return {
      entries: [],
      error: 'Saved content could not be loaded. Check browser storage and try again.',
    }
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('The selected file could not be read.'))
      }
    }
    reader.onerror = () => reject(new Error('The selected file could not be read.'))
    reader.readAsDataURL(file)
  })
}

function ClassContentPage({ classNumber }) {
  const [savedState, setSavedState] = useState(() => readClassContent(classNumber))
  const [formError, setFormError] = useState('')
  const lesson = classLearningContent[classNumber]

  const addContent = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const subject = String(formData.get('subject') || '').trim()
    const link = String(formData.get('link') || '').trim()
    const file = formData.get('file')

    if (!subject) {
      setFormError('Enter a subject for this content.')
      return
    }

    if (Boolean(link) === (file instanceof File && file.size > 0)) {
      setFormError('Add either a link or a file, but not both.')
      return
    }

    if (file instanceof File && file.size > 1024 * 1024) {
      setFormError('Files must be 1 MB or smaller to save in this browser.')
      return
    }

    try {
      const newEntry = {
        id: `${Date.now()}-${Math.random()}`,
        subject,
        type: link ? 'link' : 'file',
        ...(link
          ? { link }
          : { fileName: file.name, fileData: await readFileAsDataUrl(file) }),
      }
      const nextEntries = [...savedState.entries, newEntry]

      localStorage.setItem(`classContent-${classNumber}`, JSON.stringify(nextEntries))
      setSavedState({ entries: nextEntries, error: '' })
      setFormError('')
      form.reset()
    } catch (error) {
      setFormError(
        error instanceof Error
          ? `Content could not be saved: ${error.message}`
          : 'Content could not be saved in this browser.',
      )
    }
  }

  return (
    <section className="content-page" aria-labelledby="class-content-title">
      <div className="page-heading">
        <div>
          <NavLink className="text-link content-back-link" to="/content">← All classes</NavLink>
          <h1 id="class-content-title">Class {classNumber} content</h1>
          <p>Add learning material by subject using a link or a file.</p>
        </div>
      </div>

      {lesson && (
        <section className="page-panel class-lesson" aria-labelledby="class-lesson-title">
          <span className="class-lesson-subject">{lesson.subject} starter lesson</span>
          <h2 id="class-lesson-title">{lesson.title}</h2>
          <p>{lesson.description}</p>
          <p className="class-lesson-activity"><strong>Try it:</strong> {lesson.activity}</p>
        </section>
      )}

      <form className="student-form content-form" onSubmit={addContent}>
        <h2>Add content</h2>
        <label>
          Subject
          <input name="subject" type="text" placeholder="e.g. Mathematics" required />
        </label>
        <label>
          Content link
          <input name="link" type="url" placeholder="https://example.com/lesson" />
        </label>
        <p className="content-form-divider">Or upload a file (up to 1 MB)</p>
        <label>
          Content file
          <input name="file" type="file" />
        </label>
        <button className="primary-btn" type="submit">Add content</button>
        {formError && <p className="form-message" role="alert">{formError}</p>}
        {savedState.error && <p className="form-message" role="alert">{savedState.error}</p>}
      </form>

      <section className="page-panel class-content-list" aria-labelledby="saved-content-title">
        <h2 id="saved-content-title">Your added content</h2>
        {savedState.entries.length ? (
          <ul className="content-entry-list">
            {savedState.entries.map((entry) => (
              <li className="content-entry" key={entry.id}>
                <div>
                  <h3>{entry.subject}</h3>
                  <p>{entry.type === 'link' ? 'Web link' : entry.fileName}</p>
                </div>
                {entry.type === 'link' ? (
                  <a className="text-link" href={entry.link} target="_blank" rel="noreferrer">
                    Open link ↗
                  </a>
                ) : (
                  <a className="text-link" href={entry.fileData} download={entry.fileName}>
                    Download file ↓
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No extra content has been added for this class yet.</p>
        )}
      </section>
    </section>
  )
}

function ContentClassPage() {
  const { classNumber } = useParams()
  return <ClassContentPage key={classNumber} classNumber={classNumber} />
}

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
  const topStudent = students.reduce((best, student) => {
    if (!best || (Number(student.marks) || 0) > (Number(best.marks) || 0)) {
      return student
    }

    return best
  }, null)
  const presentStudents = students.filter((student) => student.status === 'Present')
  const absentStudents = students.filter((student) => student.status !== 'Present')

  return (
    <div>
      <section className="dashboard-insights" aria-label="Classroom insights">
        <div className="dashboard-insight-card attendance-insight">
          <div className="dashboard-insight-heading">
            <div>
              <h2>Attendance today</h2>
              <p>{presentCount} of {totalStudents} learners are present</p>
            </div>
            <strong className="attendance-rate">{attendancePercentage}%</strong>
          </div>
          <div className="attendance-meter" aria-label={`${attendancePercentage}% attendance`}>
            <span style={{ width: `${attendancePercentage}%` }} />
          </div>
          <div className="attendance-lists">
            <div>
              <h3><span className="attendance-dot present-dot" />Present</h3>
              <p>{presentStudents.length ? presentStudents.map((student) => student.name).join(', ') : 'No learners marked present'}</p>
            </div>
            <div>
              <h3><span className="attendance-dot absent-dot" />Absent</h3>
              <p>{absentStudents.length ? absentStudents.map((student) => student.name).join(', ') : 'No learners marked absent'}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-insight-card spotlight-insight">
          <p className="spotlight-eyebrow">LEARNING SPOTLIGHT</p>
          {topStudent ? (
            <>
              <h2>{topStudent.name}</h2>
              <p>Leading the class with <strong>{Number(topStudent.marks) || 0}%</strong> progress. Keep up the great work!</p>
            </>
          ) : (
            <>
              <h2>Ready to grow</h2>
              <p>Add learners to celebrate progress and class achievements here.</p>
            </>
          )}
        </div>
      </section>

      <section className="welcome">
        <div>
          <h2>Every learner matters</h2>
          <p>Manage students, track attendance and celebrate progress.</p>
        </div>
        <span className="welcome-icon" aria-hidden="true">🎓</span>
      </section>

      <section className="stats">
        <div className="stat-card purple">
          <span aria-hidden="true">👩‍🎓</span>
          <p>Total Students</p>
          <h2>{totalStudents}</h2>
        </div>

        <div className="stat-card green">
          <span aria-hidden="true">📅</span>
          <p>Attendance Today</p>
          <h2>{attendancePercentage}%</h2>
        </div>

        <div className="stat-card orange">
          <span aria-hidden="true">📈</span>
          <p>Average Progress</p>
          <h2>{averageProgress}%</h2>
        </div>
      </section>

      <h2 className="section-title">Quick Access</h2>

      <section className="cards">
        <NavLink className="card" to="/students">
          <h2>Students</h2>
          <p>Manage student records</p>
          <span className="card-link">Open page →</span>
        </NavLink>

        <NavLink className="card" to="/attendance">
          <h2>Attendance</h2>
          <p>Track daily attendance</p>
          <span className="card-link">Open page →</span>
        </NavLink>

        <NavLink className="card" to="/progress">
          <h2>Progress</h2>
          <p>Monitor student performance</p>
          <span className="card-link">Open page →</span>
        </NavLink>
      </section>

      <section className="dashboard-progress" aria-labelledby="dashboard-progress-title">
        <div className="dashboard-section-heading">
          <div>
            <h2 id="dashboard-progress-title">Student progress</h2>
            <p>A quick look at how each learner is doing.</p>
          </div>
          <NavLink to="/progress" className="text-link">View all progress →</NavLink>
        </div>

        <div className="dashboard-progress-list">
          {students.map((student) => {
            const marks = Math.min(100, Math.max(0, Number(student.marks) || 0))

            return (
              <div className="dashboard-progress-row" key={student.id}>
                <div className="learner-details">
                  <div>
                    <h3>{student.name}</h3>
                    <p>{student.className}</p>
                  </div>
                </div>
                <div
                  className="dashboard-progress-track"
                  role="progressbar"
                  aria-label={`${student.name} progress`}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={marks}
                >
                  <span style={{ width: `${marks}%` }} />
                </div>
                <strong className="dashboard-progress-score">{marks}%</strong>
              </div>
            )
          })}
          {students.length === 0 && (
            <p className="empty-progress">Add a student to see their progress here.</p>
          )}
        </div>
      </section>

    </div>
  )
}

function AdminLayout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>LearnHub</h2>
        <p className="tagline">Community Learning</p>

        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/attendance">Attendance</NavLink>
          <NavLink to="/progress">Progress</NavLink>
          <NavLink to="/records">Records</NavLink>
          <NavLink to="/content">CONTENT</NavLink>
        </nav>

        <div className="sidebar-bottom">
          <p>Learn • Track • Grow</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Community Learning Portal</h1>
            <p>Welcome back. Here is your learning overview.</p>
          </div>

          <NavLink to="/login" className="profile">Logout</NavLink>
        </header>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/records" element={<Records />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/content/:classNumber" element={<ContentClassPage />} />
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