import mongoose from 'mongoose'

export async function connect(){
    try {
      mongoose.connect(process.env.MONGO_URI!)  
      const connection = mongoose.connection

      connection.on("Connected",()=>{
        console.log("MongoDB connected Successfully")
      })
      connection.on("error",(err)=>{
        console.log("MOngoDB connection error. Please make sure mongodb is running." + err)
        process.exit(1)
      })
    } catch (error) {
        console.log("Something went wrong")
        console.log(error)
    }
}