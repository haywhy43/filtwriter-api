import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import initializeDb from "./db";
import jwt from "./middleware/jwt";
import api from "./routes/index";
import auth from "./routes/auth"
const cloudinary = require("cloudinary").v2;

// config
const setting = require("./config");
dotenv.config();
cloudinary.config(setting.cloudinary);
const app = express();
app.server = http.createServer(app);
app.use(cors());
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

try {
    initializeDb(db => {
        // app.use();

        app.use("/routes/index", api({ db, cloudinary, jwt }));

        app.use("/routes/auth", auth({ db }));

        app.server.listen(process.env.PORT, () => {
            console.log("localhost is listening on port " + process.env.PORT);
        });
    });
} catch (error) {
    console.log(error);
}
