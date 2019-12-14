const { Router } = require("express");
const multer = require("multer");
const Article = require("../controllers/article");
const Dashboard = require("../controllers/dashboard");

module.exports = ({ db, cloudinary, jwt }) => {
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

    api.post("/image/upload", upload.single("upload"), (req, res) => {
        Article.handleImageUpload(req, res, cloudinary);
    });

    return api;
};
