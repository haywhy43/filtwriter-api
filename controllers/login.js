const jwt = require("jsonwebtoken");
const config = require("../config");


const handleLogin = (req, res, db, bcrypt) => {
    db.select("name", "password")
        .from("users")
        .where("name", "=", req.body.name)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].password);
            if (isValid) {
                let userName = data[0].name,
                    pass = data[0].password;

                let token = jwt.sign(data[0], config.secret, {
                    expiresIn: "12h"
                });

                res.status(200).json({
                    success: 'true',
                    message: "Login Successful",
                    token: token
                })
            } else {
                res.status(400).json({
                    message: "Validation Error, Please enter correct credentials"
                });
            }
        });
};

module.exports = { handleLogin };
