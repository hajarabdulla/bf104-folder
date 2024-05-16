const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);

  if (!token) return res.status(401).json({ message: "Unautorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    next();
  });
}

module.exports = authenticateToken;
