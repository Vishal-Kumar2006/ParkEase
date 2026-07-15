if (process.env.NODE_ENV !== "production") {
  const dns = require("dns");
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const cookieParser = require("cookie-parser");

const Parking = require("./models/parking");
const Booking = require("./models/booking");
const Review = require("./models/review");
const User = require("./models/user");

dotenv.config();

const app = express();

/* 🔥 REQUIRED FOR RENDER */
app.set("trust proxy", 1);

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://parkease-6xhi.onrender.com", "http://localhost:5173"],

    credentials: true,
  }),
);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch(console.error);

/* Session */
app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

/* Routes */
app.use("/user", require("./routes/user"));
app.use("/parkings", require("./routes/parking"));
app.use("/bookings", require("./routes/booking"));
app.use("/reviews", require("./routes/review"));

/* Server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT} `);
});
