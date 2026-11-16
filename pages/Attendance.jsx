import { useState } from 'react'
import { useStudents } from '../useStudents'

const classOptions = Array.from({ length: 10 }, (_, index) => `Class ${index + 1}`)

function Attendance() {
  const { students, setStudents } = useStudents()
  const [selectedClass, setSelectedClass] = useState('All classes')

  const visibleStudents = students.filter((student) =>
    selectedClass === 'All classes' ? true : student.className === selectedClass,
  )
  const presentCount = visibleStudents.filter(
    (student) => student.status === 'Present',
  ).length
  const absentCount = visibleStudents.length - presentCount
  const attendancePercentage = visibleStudents.length
    ? Math.round((presentCount / visibleStudents.length) * 100)
    : 0

  const groupedStudents = visibleStudents.reduce((groups, student) => {
    const className = student.className || 'Unassigned'
    groups[className] = [...(groups[className] || []), student]
    return groups
  }, {})

  const orderedClassNames = selectedClass === 'All classes'
    ? [
        ...classOptions.filter((className) => groupedStudents[className]),
        ...Object.keys(groupedStudents).filter(
          (className) => !classOptions.includes(className),
        ),
      ]
    : groupedStudents[selectedClass]
      ? [selectedClass]
      : []

  const updateStatus = (id, nextStatus) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, status: nextStatus } : student,
      ),
    )
  }

  return (
    <div className="page attendance-page">
      <div className="page-heading">
        <div>
          <h1>Attendance</h1>
          <p>Choose a class to review and update daily attendance.</p>
        </div>
      </div>

      <section className="attendance-class-picker" aria-label="Filter attendance by class">
        <button
          type="button"
          className={`attendance-class-filter${selectedClass === 'All classes' ? ' active' : ''}`}
          aria-pressed={selectedClass === 'All classes'}
          onClick={() => setSelectedClass('All classes')}
        >
          All classes
        </button>
        {classOptions.map((className) => (
          <button
            type="button"
            className={`attendance-class-filter${selectedClass === className ? ' active' : ''}`}
            aria-pressed={selectedClass === className}
            key={className}
            onClick={() => setSelectedClass(className)}
          >
            {className}
          </button>
        ))}
      </section>

      <section className="attendance-overview" aria-label="Attendance summary">
        <div className="attendance-overview-title">
          <div>
            <p className="attendance-overview-label">ATTENDANCE OVERVIEW</p>
            <h2>{selectedClass === 'All classes' ? 'All classes' : selectedClass}</h2>
          </div>
          <span className="attendance-date">
            {new Intl.DateTimeFormat(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            }).format(new Date())}
          </span>
        </div>
        <div className="attendance-summary">
          <div className="attendance-stat present-stat">
            <span>Present</span>
            <strong>{presentCount}</strong>
          </div>
          <div className="attendance-stat absent-stat">
            <span>Absent</span>
            <strong>{absentCount}</strong>
          </div>
          <div className="attendance-stat total-stat">
            <span>Total learners</span>
            <strong>{visibleStudents.length}</strong>
          </div>
          <div className="attendance-stat rate-stat">
            <span>Attendance rate</span>
            <strong>{attendancePercentage}%</strong>
          </div>
        </div>
      </section>

      <section className="attendance-class-list" aria-label="Class attendance lists">
        {orderedClassNames.length ? (
          orderedClassNames.map((className) => {
            const classStudents = groupedStudents[className]
            const classPresent = classStudents.filter(
              (student) => student.status === 'Present',
            ).length

            return (
              <section className="attendance-class-card" key={className}>
                <header className="attendance-class-heading">
                  <div>
                    <h2>{className}</h2>
                    <p>{classStudents.length} {classStudents.length === 1 ? 'learner' : 'learners'}</p>
                  </div>
                  <span className="attendance-class-count">
                    {classPresent} / {classStudents.length} present
                  </span>
                </header>

                <div className="attendance-learner-list">
                  {classStudents.map((student) => (
                    <article className="attendance-learner-row" key={student.id}>
                      <div className="attendance-learner-info">
                        <span className="attendance-learner-initial" aria-hidden="true">
                          {student.name.trim().charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <h3>{student.name}</h3>
                          <p>Age {student.age}</p>
                        </div>
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
                      <div className="attendance-actions" aria-label={`Set attendance for ${student.name}`}>
                        <button
                          type="button"
                          className={`attendance-action present-action${student.status === 'Present' ? ' selected' : ''}`}
                          aria-pressed={student.status === 'Present'}
                          onClick={() => updateStatus(student.id, 'Present')}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          className={`attendance-action absent-action${student.status === 'Absent' ? ' selected' : ''}`}
                          aria-pressed={student.status === 'Absent'}
                          onClick={() => updateStatus(student.id, 'Absent')}
                        >
                          Absent
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })
        ) : (
          <div className="attendance-empty-state">
            <h2>No learners in {selectedClass}</h2>
            <p>Add students to this class from the Students page, and they will appear here.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Attendance
