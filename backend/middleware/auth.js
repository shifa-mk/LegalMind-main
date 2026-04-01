import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  console.log("--- Request Received at Middleware ---");
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("❌ Rejected: No Token found");
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...decoded, _id: decoded.id || decoded._id };
    console.log("✅ Token Verified for User:", req.user._id);
    next();
  } catch (err) {
    console.log("❌ Rejected: Token Invalid", err.message);
    res.status(400).json({ message: "Invalid token" });
  }
};
export const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
