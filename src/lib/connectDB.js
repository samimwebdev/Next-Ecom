import mongoose from 'mongoose'
const connection = {}
export const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log('Already Connected')
      return
    }
    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    connection.isConnected = db.connections[0].readState
  } catch (err) {
    console.log('Error connecting to MongoDB: ', err)
  }
}
