const Course = require('../models/course')

const wrap = (fn) => (req, res) =>
  fn(req, res).catch((e) => res.status(400).json({ error: e.message }))

exports.getAll = wrap(async (req, res) => {
  res.json(await Course.find())
})

exports.getOne = wrap(async (req, res) => {
  const course = await Course.findById(req.params.id)
  course ? res.json(course) : res.status(404).json({ error: 'Course not found' })
})

exports.create = wrap(async (req, res) => {
  res.status(201).json(await Course.create(req.body))
})
