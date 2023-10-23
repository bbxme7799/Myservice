import mongoose from "mongoose";

const connect = async () => {
  try {
    // เชื่อมต่อกับ MongoDB โดยใช้ค่า MONGODB_URI ที่ได้รับมาจาก process.env
    const checklog = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Connection failed!!", error);
    throw new Error("Connection failed!!");
  }
};

export default connect;
