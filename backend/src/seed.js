// One-off script: load mock-data/bd.json into MongoDB Atlas.
// Run with: npm run seed
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const connectDB = require('./db')
const Student = require('./models/student')
const Course = require('./models/course')

async function seed() {
  await connectDB()

  const file = path.join(__dirname, '../../mock-data/bd.json')
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'))

  await Student.deleteMany({})
  await Course.deleteMany({})

  // Insert courses first, then map the original mock ids to the new Mongo ids
  const idMap = {}
  for (const c of data.courses) {
    const created = await Course.create({ courseName: c.courseName })
    idMap[c.id] = created.id
  }

  for (const s of data.students) {
    await Student.create({
      firstName: s.firstName,
      lastName: s.lastName,
      courseId: idMap[s.courseId],
      academicYear: s.academicYear,
    })
  }

  console.log(`Seeded ${data.courses.length} courses and ${data.students.length} students`)
  await mongoose.disconnect()
}

seed().catch((e) => {
  console.error('Seed failed:', e.message)
  process.exit(1)
})
