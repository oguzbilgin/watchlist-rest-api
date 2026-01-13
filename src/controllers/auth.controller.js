import { prisma } from "../config/db.js";
import bcypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({status: 'fail', error: 'User already exists with this email'});
    };

    //Hash password
    const salt = await bcypt.genSalt(10);
    const hashedPassword = await bcypt.hash(password, salt);

    //Create User
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

  //Generate JWT token
  const token = generateToken(user.id, res);
  
    return res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: name,
          email: email
        },
        token
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    //Check if user email exists in the table
    const user = await prisma.user.findUnique({
      where: {email},
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password"
      });
    };

    //Verify the password
    const isPasswordValid = await bcypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password"
      });
    }

    //Generate JWT token
    const token = generateToken(user.id, res);

    return res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: email
        },
        token
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "strict",
    });
    return res.status(200).json({
      status: "success",
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

export {register, login, logOut};