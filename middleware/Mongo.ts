import mongoose, { connect } from 'mongoose'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const connectDB =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res)
    }
    const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/?codesware'
    await connect(uri)
    return handler(req, res)
  }

export const connectOnce = async () => {
  if (mongoose.connections[0].readyState) {
    return
  }
  const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/?codesware'
  await connect(uri)
}

export default connectDB
