import { useState } from 'react'
import { useStudents } from '../useStudents'

function StudentProgressRow({ student, onSave }) {
  const [marks, setMarks] = useState(String(student.marks))
  const [saved, setSaved] = useState(false)

  const saveMarks = (event) => {
    event.preventDefault()
    const nextMarks = Number(marks)

    if (!Number.isFinite(nextMarks) || nextMarks < 0 || nextMarks > 100) return

    onSave(student.id, nextMarks)
    setSaved(true)
  }

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.className}</td>
      <td>
        <div
          className="progress-track"
          role="progressbar"
          aria-label={`${student.name}'s progress`}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={student.marks}
        >
          <div
            className="progress-fill"
            style={{ width: `${student.marks}%` }}
          />
        </div>
      </td>
      <td className="progress-score">{student.marks}%</td>
      <td>
        <form className="score-editor" onSubmit={saveMarks}>
          <label className="visually-hidden" htmlFor={`marks-${student.id}`}>
            Marks for {student.name}
          </label>
          <input
            id={`marks-${student.id}`}
            type="number"
            min="0"
            max="100"
            step="any"
            required
            value={marks}
            onChange={(event) => {
              setMarks(event.target.value)
              setSaved(false)
            }}
          />
          <span className="score-suffix">%</span>
          <button type="submit" className="primary-btn score-save-btn">
            Save
          </button>
          {saved && <span className="score-saved" role="status">Saved</span>}
        </form>
      </td>
    </tr>
  )
}

function Progress() {
  const { students, setStudents } = useStudents()

  const updateProgress = (id, marks) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, marks } : student,
      ),
    )
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Progress</h1>
          <p>Enter and save each learner&apos;s exact score.</p>
        </div>
      </div>

      <div className="page-panel">
        <h2>Performance Overview</h2>
        <p className="muted">
          Set marks from 0 to 100. Whole numbers and decimal values are accepted.
        </p>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Progress</th>
                <th>Current Marks</th>
                <th>Set Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <StudentProgressRow
                    key={student.id}
                    student={student}
                    onSave={updateProgress}
                  />
                ))
              ) : (
                <tr>
                  <td className="progress-empty" colSpan="5">
                    No students yet. Add a student to start tracking progress.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Progress
