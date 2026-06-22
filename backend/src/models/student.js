const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  courseId: { type: String, required: true },
  academicYear: { type: String, required: true },
})

// Return `id` (string) instead of `_id`, so the API matches the json-server shape
studentSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

module.exports = mongoose.model('Student', studentSchema)
