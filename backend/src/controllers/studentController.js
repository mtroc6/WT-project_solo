const Student = require('../models/student')

// run an async handler and turn errors (bad id, validation) into 400
const wrap = (fn) => (req, res) =>
  fn(req, res).catch((e) => res.status(400).json({ error: e.message }))

exports.getAll = wrap(async (req, res) => {
  res.json(await Student.find())
})

exports.getOne = wrap(async (req, res) => {
  const student = await Student.findById(req.params.id)
  student ? res.json(student) : res.status(404).json({ error: 'Student not found' })
})

exports.create = wrap(async (req, res) => {
  res.status(201).json(await Student.create(req.body))
})

exports.update = wrap(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  student ? res.json(student) : res.status(404).json({ error: 'Student not found' })
})

exports.remove = wrap(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id)
  student ? res.status(204).end() : res.status(404).json({ error: 'Student not found' })
})
