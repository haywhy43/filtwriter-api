import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import initializeDb from "./db";
import jwt from "./middleware/jwt";
import api from "./routes";
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

const unless = function(path, middleware) {
    return function(req, res, next) {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

try {
    initializeDb(db => {
        app.use(unless("/login", jwt.checkToken));

        app.use("/routes", api({ db, cloudinary, jwt }));

        app.server.listen(process.env.PORT, () => {
            console.log("localhost is listening on port " + process.env.PORT);
        });
    });
} catch (error) {
    console.log(error);
}
