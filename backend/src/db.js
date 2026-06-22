const mongoose = require('mongoose')

// Connect to MongoDB Atlas using the URI from .env
module.exports = function connectDB() {
  return mongoose.connect(process.env.MONGODB_URI)
}
