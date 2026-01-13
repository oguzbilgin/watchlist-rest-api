import jwt from "jsonwebtoken";
import {prisma} from "../config/db.js";

// Read the token from the request and check if it is valid
const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if(!token) {
    return res.status(401).json({
      status: "failed",
      message: "Not authorized, no token provided"
    });
  }

  try {
    //Verify token and extract the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {id: decoded.id},
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if(!user) {
      return res
        .status(401)
        .json({
          status: "failed",
          message: "User no longer exists"
        });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({status: "failed", message: "Not authorized, token invalid or expired"});
  }
}

export {authenticate};