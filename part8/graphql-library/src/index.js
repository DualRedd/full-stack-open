import dotenv from 'dotenv'
import startServer from './server.js'
import connectDB from './db.js'

dotenv.config()
const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI

const main = async () => {
  await connectDB(MONGODB_URI)
  startServer(PORT)
}

main()
