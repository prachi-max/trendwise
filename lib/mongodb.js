// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGODB_URI;

//     if (!uri) {
//       throw new Error(" MONGODB_URI is not defined in .env.local");
//     }

//     if (mongoose.connections[0].readyState) {
//       console.log(" Already connected to MongoDB");
//       return;
//     }

//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(" MongoDB connected successfully");
//   } catch (error) {
//     console.error(" MongoDB connection error:", error);
//     throw error;
//   }
// };

// export default connectDB;


import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) throw new Error("❌ MONGODB_URI is not defined in .env.local");

  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(uri); // no need for old options
  console.log("✅ MongoDB connected");
};

export default connectDB;
