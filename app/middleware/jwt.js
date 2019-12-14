const jwt = require("jsonwebtoken");
const config = require("../config");
const checkToken = (req, res, next) => {
    if (req.path != "/login" && req.path != "/register") {
        let token = req.headers["x-access-token"] || req.headers["authorization"] || " ";

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorized access"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Auth token is not supplied"
            });
        }
    } else {
        next();
    }
};
module.exports = { checkToken };
