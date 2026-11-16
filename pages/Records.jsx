import { useState } from 'react'
import { useStudents } from '../useStudents'

function Records() {
  const { students } = useStudents()
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.className}`.toLowerCase().includes(normalizedQuery),
  )

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Student Records</h1>
          <p>Find each student&apos;s profile, current marks, and attendance status.</p>
        </div>
      </div>

      <section className="page-panel" aria-labelledby="student-records-title">
        <div className="records-heading">
          <div>
            <h2 id="student-records-title">All student records</h2>
            <p className="muted">
              {filteredStudents.length} of {students.length} students
            </p>
          </div>
          <label className="record-search">
            <span>Search by name or class</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. Aarav or Class 6"
            />
          </label>
        </div>

        {filteredStudents.length > 0 ? (
          <div className="student-record-grid">
            {filteredStudents.map((student) => (
              <article className="student-record-card" key={student.id}>
                <div className="student-record-title">
                  <div>
                    <h3>{student.name}</h3>
                    <p>{student.className}</p>
                  </div>
                  <span
                    className={
                      student.status === 'Present'
                        ? 'status-present'
                        : 'status-absent'
                    }
                  >
                    {student.status}
                  </span>
                </div>
                <dl className="student-record-details">
                  <div>
                    <dt>Age</dt>
                    <dd>{student.age} years</dd>
                  </div>
                  <div>
                    <dt>Current marks</dt>
                    <dd>{student.marks}%</dd>
                  </div>
                  <div>
                    <dt>Attendance</dt>
                    <dd>{student.status}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        ) : (
          <p className="records-empty">
            {students.length
              ? 'No student records match your search.'
              : 'No student records yet. Add students to see their records here.'}
          </p>
        )}
      </section>
    </div>
  )
}

export default Records
