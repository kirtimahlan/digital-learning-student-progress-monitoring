
import {
  useEffect,
  useState,
} from 'react'
import { StudentContext } from './studentContext'

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

const additionalStudents = [
  {
    id: 4,
    name: 'Meera Patel',
    age: 12,
    className: 'Class 6',
    marks: 77,
    status: 'Present',
  },
  {
    id: 5,
    name: 'Kabir Singh',
    age: 14,
    className: 'Class 8',
    marks: 81,
    status: 'Present',
  },
  {
    id: 6,
    name: 'Diya Shah',
    age: 10,
    className: 'Class 4',
    marks: 89,
    status: 'Present',
  },
  {
    id: 7,
    name: 'Arjun Mehta',
    age: 13,
    className: 'Class 7',
    marks: 74,
    status: 'Absent',
  },
  {
    id: 8,
    name: 'Sana Khan',
    age: 11,
    className: 'Class 5',
    marks: 95,
    status: 'Present',
  },
]

const sampleStudentsKey = 'communityStudentsAdditionalSamplesV1'

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('communityStudents')
      if (saved === null) {
        localStorage.setItem(sampleStudentsKey, 'true')
        return [...initialStudents, ...additionalStudents]
      }

      const currentStudents = JSON.parse(saved)
      if (localStorage.getItem(sampleStudentsKey) === 'true') {
        return currentStudents
      }

      const currentIds = new Set(currentStudents.map((student) => student.id))
      const mergedStudents = [
        ...currentStudents,
        ...additionalStudents.filter((student) => !currentIds.has(student.id)),
      ]

      localStorage.setItem('communityStudents', JSON.stringify(mergedStudents))
      localStorage.setItem(sampleStudentsKey, 'true')
      return mergedStudents
    } catch {
      return [...initialStudents, ...additionalStudents]
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
