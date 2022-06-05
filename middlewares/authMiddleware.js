import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function authRequired(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id).select("-password");

    next();
  }

  if (!token) {
    res.status(401);
    return res.json({
      msg: "Not authorized",
    });
  }
}

export { authRequired };
