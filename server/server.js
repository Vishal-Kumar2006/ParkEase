const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const { restrictedToLoggedInUserOnly } = require("./middleware/auth");

// Load env FIRST
dotenv.config();

// Routes
const parkingRoutes = require("./routes/parking");
const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/booking");
const reviewRoutes = require("./routes/review");

const app = express();

// BASIC MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (STRICT)
app.use(
  cors({
    origin: "https://parkease-6xhi.onrender.com", // FRONTEND URL ONLY
    credentials: true,
  }),
);

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// SESSION (CRITICAL PART)
app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),

    cookie: {
      httpOnly: true,
      secure: true, // REQUIRED on Render (HTTPS)
      sameSite: "none", // REQUIRED for cross-site cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

//  FLASH (OPTIONAL)
app.use(flash());

// ROUTES
app.use("/parkings", parkingRoutes);
app.use("/user", userRoutes);

app.use("/bookings", restrictedToLoggedInUserOnly, bookingRoutes);
app.use("/reviews", restrictedToLoggedInUserOnly, reviewRoutes);

// HEALTH CHECK (IMPORTANT)
app.get("/", (req, res) => {
  res.json({ status: "Backend running ✅" });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
