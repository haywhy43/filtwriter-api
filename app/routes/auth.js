const { Router } = require("express");
const Auth = require("../controllers/auth");
const bcrypt = require("bcryptjs");

module.exports = ({ db }) => {
    const auth = Router();

    auth.post("/register", (req, res) => {
        Auth.handleRegister(req, res, db, bcrypt);
    });

    auth.post("/login", (req, res) => {
        Auth.handleLogin(req, res, db, bcrypt);
    });

    return auth;
};
