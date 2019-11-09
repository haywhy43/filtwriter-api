// dependencies...
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Middleware
const verifyToken = require("./middleware/jwt");

// Controllers
const Home = require("./controllers/homeController");
const Register = require("./controllers/register");
const Login = require("./controllers/login");
const Articles = require("./controllers/articleController");
const UploadArticle = require("./controllers/uploadArticleController");

// config
const setting = require("./config");

dotenv.config();
cloudinary.config(setting.cloudinary);

const port = process.env.PORT;
const app = express();
const upload = multer({ dest: "uploads/" });
const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        user: "peafngzxrmturs",
        database: "d987vpb6s8jq8",
        ssl: true
    }
});
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", verifyToken.checkToken, Home.homeController);

app.post("/register", (req, res) => {
    Register.handleRegister(req, res, db, bcrypt);
});

app.post("/login", cors(), (req, res) => {
    Login.handleLogin(req, res, db, bcrypt);
});

app.get("/articles", verifyToken.checkToken, (req, res) => {
    Articles.handleArticle(req, res, db);
});

app.post("/article/upload", verifyToken.checkToken, upload.single("picture"), (req, res) => {
    UploadArticle.handleUpload(req, res, cloudinary, db);
});

app.post("/article/edit", verifyToken.checkToken, upload.single("picture"), (req, res) => {
    UploadArticle.handleEdit(req, res, cloudinary, db);
});

app.post("/article/publish", verifyToken.checkToken, upload.single("picture"), (req, res) => {
    UploadArticle.handlePublish(req, res, cloudinary, db);
});

app.delete("/article/delete", verifyToken.checkToken, (req, res) => {
    Articles.handleDelete(req, res, db);
});

app.listen(port, () => {
    console.log("localhost is listening on port " + port);
});
