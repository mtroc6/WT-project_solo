import { useEffect, useState } from 'react'
import './App.css'

// Mock: http://localhost:3001 (json-server). Real API set via VITE_API_URL.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

type Course = {
  id: string
  courseName: string
}

type Student = {
  id: string
  firstName: string
  lastName: string
  courseId: string
  academicYear: string
}

const emptyStudent = { firstName: '', lastName: '', courseId: '', academicYear: '' }

function App() {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  // editingId === null -> form adds a student; otherwise it edits that student
  const [form, setForm] = useState(emptyStudent)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [newCourse, setNewCourse] = useState('')

  const loadData = async () => {
    const [s, c] = await Promise.all([
      fetch(`${API_URL}/students`).then(r => r.json()),
      fetch(`${API_URL}/courses`).then(r => r.json()),
    ])
    setStudents(s)
    setCourses(c)
  }

  useEffect(() => {
    loadData()
  }, [])

  const courseName = (id: string) => courses.find(c => c.id === id)?.courseName ?? '-'

  const saveStudent = async () => {
    if (!form.firstName || !form.lastName || !form.courseId || !form.academicYear) return

    const res = await fetch(
      editingId ? `${API_URL}/students/${editingId}` : `${API_URL}/students`,
      {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      },
    )
    if (res.ok) {
      setForm(emptyStudent)
      setEditingId(null)
      loadData()
    }
  }

  const editStudent = (s: Student) => {
    setEditingId(s.id)
    setForm({
      firstName: s.firstName,
      lastName: s.lastName,
      courseId: s.courseId,
      academicYear: s.academicYear,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyStudent)
  }

  const deleteStudent = async (id: string) => {
    const res = await fetch(`${API_URL}/students/${id}`, { method: 'DELETE' })
    if (res.ok) loadData()
  }

  const addCourse = async () => {
    if (!newCourse) return
    const res = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseName: newCourse }),
    })
    if (res.ok) {
      setNewCourse('')
      loadData()
    }
  }

  return (
    <div className="app">
      <h1>Students</h1>

      <table className="table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Course</th>
            <th>Academic year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>{courseName(s.courseId)}</td>
              <td>{s.academicYear}</td>
              <td className="actions">
                <button onClick={() => editStudent(s)}>Edit</button>
                <button className="danger" onClick={() => deleteStudent(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form">
        <h2>{editingId ? 'Edit student' : 'Add student'}</h2>
        <div className="fields">
          <input
            placeholder="First name"
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            placeholder="Last name"
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
          />
          <select value={form.courseId} onChange={e => setForm({ ...form, courseId: e.target.value })}>
            <option value="">Select course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.courseName}
              </option>
            ))}
          </select>
          <input
            placeholder="Academic year (e.g. 2024/2025)"
            value={form.academicYear}
            onChange={e => setForm({ ...form, academicYear: e.target.value })}
          />
        </div>
        <div className="form-actions">
          <button className="primary" onClick={saveStudent}>
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && <button onClick={cancelEdit}>Cancel</button>}
        </div>
      </div>

      <h1>Courses</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Course name</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.courseName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form">
        <h2>Add course</h2>
        <div className="fields">
          <input
            placeholder="Course name"
            value={newCourse}
            onChange={e => setNewCourse(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button className="primary" onClick={addCourse}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
