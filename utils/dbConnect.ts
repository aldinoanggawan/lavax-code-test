import mongoose from 'mongoose'

const connection: any = {}
const uri: string = process.env.MONGODB_URI as string

const dbConnect = async () => {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState
  console.log(connection.isConnected)
}

export default dbConnect
