import mongoose from 'mongoose'

const MONGO_URL = 'mongodb://127.0.0.1/auth_next_13'

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB.')
  } catch (error) {
    console.log(error)
  }
}
