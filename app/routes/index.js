import { Router } from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import Article from "../controllers/article";
import Auth from "../controllers/auth"

export default ({ db, cloudinary }) => {
    const api = Router();
    const upload = multer({ dest: "uploads/" });

    api.get("/", (req, res)=>{
        res.send("Filt-writer Api")
    });

    api.post("/register", (req, res) => {
        Auth.handleRegister(req, res, db, bcrypt);
    });

    api.post("/login",  (req, res) => {
        Auth.handleLogin(req, res, db, bcrypt);
    });

    api.get("/articles", (req, res) => {
        Article.handleArticle(req, res, db);
    });

    api.post("/article/upload", upload.single("picture"), (req, res) => {
        Article.handleUpload(req, res, cloudinary, db);
    });

    api.post("/article/edit", upload.single("picture"), (req, res) => {
        Article.handleEdit(req, res, cloudinary, db);
    });

    api.post("/article/publish", upload.single("picture"), (req, res) => {
        Article.handlePublish(req, res, cloudinary, db);
    });

    api.delete("/article/delete", (req, res) => {
        Article.handleDelete(req, res, db);
    });


    return api;
};
