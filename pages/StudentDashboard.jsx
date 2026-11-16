import { Link } from 'react-router-dom'
import { useStudents } from '../useStudents'

const learningResources = [
  {
    subject: 'Mathematics',
    title: 'Practice mental maths',
    description: 'Try adding and subtracting two-digit numbers in your head.',
    activity: 'Challenge: solve 48 + 27 without a calculator.',
  },
  {
    subject: 'English',
    title: 'Read and retell',
    description: 'Read a short story, then explain its main idea in your own words.',
    activity: 'Challenge: name the main character and one lesson from the story.',
  },
  {
    subject: 'Science',
    title: 'Explore the water cycle',
    description: 'Learn how water moves between the ground, air, and clouds.',
    activity: 'Challenge: draw and label the stages of the water cycle.',
  },
]

function StudentDashboard() {
  const { students } = useStudents()

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Student Dashboard</h1>
          <p>View your class progress and daily attendance at a glance.</p>
        </div>
        <Link to="/" className="primary-btn" style={{ textDecoration: 'none' }}>
          Back to Admin
        </Link>
      </div>

      <section className="cards">
        {students.map((student) => (
          <div key={student.id} className="card" style={{ borderTopColor: '#28b99a' }}>
            <span className="card-icon">👩‍🎓</span>
            <h2>{student.name}</h2>
            <p>
              {student.className} • {student.age} years old
            </p>
            <p>
              Marks: {student.marks}% • Status: {student.status}
            </p>
            <span className="card-link">Learning update →</span>
          </div>
        ))}
      </section>

      <section className="page-panel learning-corner" aria-labelledby="learning-corner-title">
        <h2 id="learning-corner-title">Learning Corner</h2>
        <p className="muted">Pick a short activity to practise something new today.</p>
        <div className="learning-resource-grid">
          {learningResources.map((resource) => (
            <article className="learning-resource-card" key={resource.subject}>
              <span className="learning-resource-subject">{resource.subject}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <p className="learning-resource-activity">{resource.activity}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default StudentDashboard
