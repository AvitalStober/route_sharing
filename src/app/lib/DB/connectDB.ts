import mongoose from "mongoose";
const MONGODB_URI = process.env.URI || "";

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("connect mongoDB");
    }catch(error){
        throw new Error("Error in connecting to mongoDB");
    }
};

export default connect;