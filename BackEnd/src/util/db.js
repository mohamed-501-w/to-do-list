import mongoose from 'mongoose';
import dotenv from 'dotenv';

//connect to db
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("CONNECTED SUCCESSFULLY TO MONGODB")
    } catch (error) {
        console.error("Error connecting to MONGODB", {error})
        process.exit(1)
    }
}


export default connectDb