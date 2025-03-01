const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const pagesRoutes = require("./routes/pages.js");
const userRoutes = require('./routes/user.js');




const app = express();

app.use(express.json()); // To Get Json data fron Backend
app.use(cors()); // To Parse Data for Frontend

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
async function connectDB() {
  try {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas Connected!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}
connectDB();


// ✅ Routes
app.use("/parkings", pagesRoutes);
app.use("/user", userRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});