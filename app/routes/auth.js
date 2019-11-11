import { Router } from "express";
import Auth from "../controllers/auth";
import bcrypt from "bcryptjs";

export default ({ db}) => {
    const auth = Router();

    auth.post("/register", (req, res) => {
        Auth.handleRegister(req, res, db, bcrypt);
    });

    auth.post("/login", (req, res) => {
        Auth.handleLogin(req, res, db, bcrypt);
    });

    return auth;
};
