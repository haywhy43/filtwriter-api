const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const initializeDb = require("./db");
const jwt = require("./middleware/jwt");
const api = require("./routes/index");
const auth = require("./routes/auth");
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
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
        app.use(jwt.checkToken);

        app.use(api({ db, cloudinary, jwt }));

        app.use(auth({ db }));

        app.server.listen(process.env.PORT, () => {
            console.log("localhost is listening on port " + process.env.PORT);
        });
    });
} catch (error) {
    console.log(error);
}
