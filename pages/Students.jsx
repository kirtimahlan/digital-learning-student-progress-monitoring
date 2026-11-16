import { useState } from 'react'
import { useStudents } from '../useStudents'

const emptyForm = {
  name: '',
  age: '',
  className: '',
  marks: '',
  status: 'Present',
}

function Students() {
  const { students, setStudents } = useStudents()
  const [form, setForm] = useState(emptyForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const addStudent = (event) => {
    event.preventDefault()

    const name = form.name.trim()
    if (!name) return

    const newStudent = {
      id: Date.now(),
      name,
      age: Number(form.age) || 0,
      className: form.className.trim() || 'Class 1',
      marks: Number(form.marks) || 0,
      status: form.status,
    }

    setStudents((current) => [...current, newStudent])
    setForm(emptyForm)
  }

  const removeStudent = (id) => {
    setStudents((current) => current.filter((student) => student.id !== id))
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <h1>Students</h1>
          <p>Manage learner records and keep the classroom updated.</p>
        </div>
      </div>

      <form className="student-form" onSubmit={addStudent}>
        <h2>Add Student</h2>

        <label>
          Student Name
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </label>

        <label>
          Age
          <input
            name="age"
            type="number"
            min="1"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </label>

        <label>
          Class
          <input
            name="className"
            type="text"
            value={form.className}
            onChange={handleChange}
            placeholder="Class 6"
          />
        </label>

        <label>
          Marks
          <input
            name="marks"
            type="number"
            min="0"
            max="100"
            value={form.marks}
            onChange={handleChange}
            placeholder="0-100"
          />
        </label>

        <label>
          Attendance Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>

        <button type="submit" className="primary-btn">Save Student</button>
      </form>

      <div className="page-panel">
        <h2>Student List</h2>
        <p className="muted">Track each learner's latest performance and status.</p>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Age</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>{student.age}</td>
                  <td>{student.marks}%</td>
                  <td>
                    <span
                      className={
                        student.status === 'Present'
                          ? 'status-present'
                          : 'status-absent'
                      }
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="primary-btn"
                      onClick={() => removeStudent(student.id)}
                      style={{ padding: '8px 12px', fontSize: '12px' }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Students
