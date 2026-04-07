import mongoose from "mongoose";


const connectDB = async () => {
    try {
      mongoose.connection.on('connected',() => {
        console.log('connected to DB successfully');
    })
    await mongoose.connect(process.env.MONGODB_URI as string)
    } catch (error) {
        console.log('getting error while connecting with DB');
        
    }
}

export default connectDB;   