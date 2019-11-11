import { Router } from "express";
// import multer from "multer";
import Auth from "../controllers/auth";
import bcrypt from "bcryptjs";

export default ({ db, cloudinary, jwt }) => {
    const auth = Router();
    // const upload = multer({ dest: "uploads/" });
    auth.post("/register", (req, res) => {
        Auth.handleRegister(req, res, db, bcrypt);
    });

    auth.post("/login", (req, res) => {
        Auth.handleLogin(req, res, db, bcrypt);
    });

    return auth;
};
