import { verifyToken } from "../services/jwt.token.js";

export const protect = (req, res, next) => {
  const header = req.headers;
  let decoded = null;
  if (header.authorization?.includes("Bearer")) {
    const token = req.headers.authorization?.split(" ")[1];
    decoded = verifyToken(token);
    if (!decoded) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
  } else {
    return res.status(404).json({ success: false, message: "Access denied" });
  }
  req.user = decoded;
  next();
};
