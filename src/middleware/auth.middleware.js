const { verifyAccessToken } = require("../services/auth.service");

// Use this on any route that should only work for logged-in users:
// router.get("/", authenticate, studentController.getAllStudents);
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(403).send({ message: "Invalid or expired token" });
  }
}

module.exports = authenticate;