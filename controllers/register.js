const handleRegister = (req, res, db, bcrypt) => {
    const { name, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    db('users')
        .returning('users')
        .insert({
            name: name,
            password: hash
        })
        .then(data=> {
            res.send(data)
        })

    // res.send(name + '' + password)
    // res.send(req.body)
};

module.exports = { handleRegister }