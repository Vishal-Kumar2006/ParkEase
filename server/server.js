const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// const flash = require("connect-flash");

const User = require("./models/userSchema");
const userRoutes = require("./routes/userRoutes.js");

const pagesRoutes = require("./routes/pages.js");


dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

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

// ✅ Store session in MongoDB
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysecretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/user/signup", (req, res) => {
  res.json("");
});

app.post("/user/signup", async (req, res) => {
    let FakeUser = {
      "name":"User Name",
        "email": "User@mail.com",
        "mobile": 1234567890,
        "photoUrl": "https://i.pinimg.com/736x/33/b0/e8/33b0e800f7dfd660e4b69d19e2c43ad8.jpg",
        "bookings":[], 
        "parkings": []
    };
    const registeredUser = await User.register(FakeUser, "helloworld");
    res.send("User Rgistered Successfully");
});

app.post("/user/login", passport.authenticate('local', failureRedirect("/user/login")), async (req, res) => {
  res.send("Welcome! You are Loggedin.")
});



// // ✅ Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // ✅ Configure Passport
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // ✅ Flash Messages
// app.use(flash());
// app.use((req, res, next) => {
//     res.locals.success = req.flash("success");
//     res.locals.error = req.flash("error");
//     next();
// });

// // ✅ Enhanced CORS Configuration
// app.use(cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000", // ✅ Allow frontend URL
//     credentials: true, // ✅ Allow cookies & sessions
//     methods: ["GET", "POST", "PUT", "DELETE"]
// }));

// // ✅ Middleware
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Root Page");
// });

// // ✅ Routes
app.use("/user", userRoutes);
app.use("/api/pages", pagesRoutes);

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at port: ${port}`);
});
