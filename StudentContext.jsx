
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const initialStudents = [
  {
    id: 1,
    name: 'Aarav Sharma',
    age: 12,
    className: 'Class 6',
    marks: 85,
    status: 'Present',
  },
  {
    id: 2,
    name: 'Ananya Verma',
    age: 13,
    className: 'Class 7',
    marks: 92,
    status: 'Absent',
  },
  {
    id: 3,
    name: 'Rohan Kumar',
    age: 11,
    className: 'Class 5',
    marks: 68,
    status: 'Present',
  },
]

const StudentContext = createContext(null)

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('communityStudents')
      return saved === null ? initialStudents : JSON.parse(saved)
    } catch {
      return initialStudents
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'communityStudents',
      JSON.stringify(students)
    )
  }, [students])

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudents() {
  return useContext(StudentContext)
}
