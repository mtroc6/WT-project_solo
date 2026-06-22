const express = require('express')
const router = express.Router()
const c = require('../controllers/courseController')

router.get('/', c.getAll)
router.get('/:id', c.getOne)
router.post('/', c.create)

module.exports = router
