const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
})

courseSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

module.exports = mongoose.model('Course', courseSchema)
