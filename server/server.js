const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // ✅ Store session in MongoDB
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const { restrictedToLoggedInUserOnly } = require("./middleware/auth.js");

dotenv.config();

const pagesRoutes = require("./routes/parking.js");
const userRoutes = require("./routes/user.js");

const app = express();

// ✅ Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Required for session cookies
  })
);

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB Connection Error:"));
db.once("open", () => console.log("✅ MongoDB Atlas Connected!"));

// ✅ Store sessions in MongoDB
app.use(
  session({
    secret: process.env.JWT_SECRET, // Secure secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60, // 7 days expiry
    }),
    cookie: {
      httpOnly: true, // Prevents client-side JS access
      secure: false, // Set to true for HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// ✅ Routes
app.use("/parkings", restrictedToLoggedInUserOnly, pagesRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});