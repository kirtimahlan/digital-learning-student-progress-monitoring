import { useContext } from 'react'
import { StudentContext } from './studentContext'

export function useStudents() {
  return useContext(StudentContext)
}
