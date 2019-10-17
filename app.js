// dependencies...
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require('cloudinary').v2

// Middleware
const verifyToken = require("./middleware/jwt");

// Controllers
const Home = require("./controllers/homeController");
const Register = require("./controllers/register");
const Login = require("./controllers/login");
const Articles = require("./controllers/articleController");
const UploadArticle = require("./controllers/uploadArticleController");
dotenv.config();

const port = process.env.PORT;
const app = express();
const upload = multer({ dest: "uploads/" });
const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "ayomikun",
        password: "",
        database: "filtwriter-db"
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", verifyToken.checkToken, Home.homeController);

app.post("/register", (req, res) => {
    Register.handleRegister(req, res, db, bcrypt);
});

app.post("/login", (req, res) => {
    Login.handleLogin(req, res, db, bcrypt);
});

app.get("/articles", verifyToken.checkToken, (req, res) => {
    Articles.handleArticle(req, res, db);
});

app.post("/article/upload", verifyToken.checkToken, upload.single("picture"), (req, res) => {
    UploadArticle.handleUpload(req, res, cloudinary, db);
});

app.listen(port, () => {
    console.log("localhost is listening on port " + port);
});
