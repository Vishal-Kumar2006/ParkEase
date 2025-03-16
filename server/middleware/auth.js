
async function restrictedToLoggedInUserOnly(req, res, next) {
    try {
        // ✅ Check if user exists in session
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        // ✅ Attach user to request object
        req.user = req.session.user;
        next(); // Continue to the next middleware

    } catch (error) {
        console.error("Authentication Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

function checkNotLoggedIn(req, res, next) {
    if (req.session.user) {
      return res.status(403).json({ message: "You are already logged in. Please log out first." });
    }
    next();
  }

module.exports = { restrictedToLoggedInUserOnly, checkNotLoggedIn };