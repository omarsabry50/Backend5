import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization") || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    if (!token) return res.status(401).json({ error: "Access denied. Missing token." });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.userRole !== "admin") return res.status(403).json({ error: "Admin only." });
  next();
};