require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')

const connectDB = require('./db')
const swaggerSpec = require('./swagger')
const studentRoutes = require('./routes/studentRoutes')
const courseRoutes = require('./routes/courseRoutes')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ status: 'API running', docs: '/api-docs' }))
app.use('/students', studentRoutes)
app.use('/courses', courseRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT || 4000

connectDB()
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch((e) => {
    console.error('DB connection failed:', e.message)
    process.exit(1)
  })
