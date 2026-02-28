import mongoose from 'mongoose'

const connectDB = async (uri) => {
  console.log('Connecting to MongoDB at uri:', uri)
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

export default connectDB
