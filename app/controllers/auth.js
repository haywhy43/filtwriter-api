/**
 * @function handleLogin
 * @description Authenticate a user
 * @param {*} req
 * @param {*} res
 * @param {*} bcrypt
 * @param {*} db
 */

const handleLogin = (req, res, db, bcrypt) => {
    db.select("name", "password")
        .from("users")
        .where("name", "=", req.body.name)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].password);
            if (isValid) {
                let token = jwt.sign(data[0], config.secret, {
                    expiresIn: "4h"
                });

                res.status(200).json({
                    success: "true",
                    message: "Login Successful",
                    token: token
                });
            } else {
                res.status(400).json({
                    message: "Validation Error, Please enter correct credentials"
                });
            }
        });
};

/**
 * @function handleRegister
 * @description Register a new user
 * @param {*} req
 * @param {*} res
 * @param {*} bcrypt
 * @param {*} db
 */

const handleRegister = (req, res, db, bcrypt) => {
    const { name, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    db("users")
        .returning("users")
        .insert({
            name: name,
            password: hash
        })
        .then(data => {
            res.send(data);
        });
};
