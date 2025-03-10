const { getUser } = require("../service/auth");


async function restrictedToLoggedInUserOnly(req, res, next) {
    try {
        const userUid = req.cookies.uid;

        if (!userUid) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const user = await getUser(userUid);

        if (!user) {
            return res.status(401).json({ message: "Invalid session. Please log in again." });
        }

        req.user = user; // Attach user to request object
        next(); // Continue to the next middleware
    } catch (error) {
        console.error("Authentication Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { restrictedToLoggedInUserOnly };
