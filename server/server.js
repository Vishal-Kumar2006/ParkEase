const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const { restrictedToLoggedInUserOnly } = require("./middleware/auth.js");

dotenv.config();

const pagesRoutes = require("./routes/parking.js");
const userRoutes = require("./routes/user.js");
const bookingRoutes = require("./routes/booking.js");
const reviewRoutes = require("./routes/review.js");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Required for session cookies
  }),
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
    secret: process.env.SESSION_SECRET || "thisIsAtempraryKey", // Use a separate session secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60, // 7 days expiry
    }),
    cookie: {
      httpOnly: true, // Prevents client-side JS access
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  }),
);

// ✅ Flash messages (must be after session middleware)
app.use(flash());

// ✅ Debugging: Log session data for testing
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// ✅ Routes
app.use("/parkings", pagesRoutes);
app.use("/user", userRoutes);
app.use("/bookings", restrictedToLoggedInUserOnly, bookingRoutes);
app.use("/reviews", restrictedToLoggedInUserOnly, reviewRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
