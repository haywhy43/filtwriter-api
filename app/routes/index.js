import { Router } from "express";
import multer from "multer";
import Article from "../controllers/article";
import Dashboard from "../controllers/dashboard";

export default ({ db, cloudinary, jwt }) => {
    const api = Router();
    const upload = multer({ dest: "uploads/" });

    api.get("/", (req, res) => {
        Dashboard.dashboardController(req, res, db);
    });

    api.get("/articles", (req, res) => {
        Article.handleArticles(req, res, db);
    });

    api.post("/article/upload", upload.single("picture"), (req, res) => {
        Article.handleUpload(req, res, cloudinary, db);
    });

    api.post("/article/edit", upload.single("picture"), (req, res) => {
        Article.handleEdit(req, res, cloudinary, db);
    });

    api.post("/article/publish", (req, res) => {
        Article.handlePublish(req, res, db);
    });

    api.delete("/article/delete", (req, res) => {
        Article.handleDelete(req, res, db);
    });

    return api;
};
