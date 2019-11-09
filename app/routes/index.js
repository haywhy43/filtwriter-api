import { Router } from "express";
import bcrypt from "bcryptjs";
import multer from "multer";



export default ({ db, cloudinary }) => {
    const api = Router();
    const upload = multer({ dest: "uploads/" });


    api.get("/", Home.homeController);

    api.post("/register", (req, res) => {
        Register.handleRegister(req, res, db, bcrypt);
    });

    api.post("/login", cors(), (req, res) => {
        Login.handleLogin(req, res, db, bcrypt);
    });

    api.get("/articles", (req, res) => {
        Articles.handleArticle(req, res, db);
    });

    api.post("/article/upload", upload.single("picture"), (req, res) => {
        UploadArticle.handleUpload(req, res, cloudinary, db);
    });

    api.post("/article/edit", upload.single("picture"), (req, res) => {
        UploadArticle.handleEdit(req, res, cloudinary, db);
    });

    api.post("/article/publish", upload.single("picture"), (req, res) => {
        UploadArticle.handlePublish(req, res, cloudinary, db);
    });

    api.delete("/article/delete", (req, res) => {
        Articles.handleDelete(req, res, db);
    });
};
