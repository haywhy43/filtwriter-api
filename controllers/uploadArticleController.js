const setting = require("../config");

const handleUpload = (req, res, cloudinary, db) => {
    cloudinary.config(setting.cloudinary);
    const data = req.body;
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        db("articles")
            // .returning('users')
            .insert({
                author: data.author,
                title: data.title,
                body: data.body,
                profile_id: result.public_id,
                created: "now"
            })
            .then(data => {
                res.status(200).send("Success");
            })
            .catch(error => {
                res.send("Failed");
            });
    });
};

module.exports = { handleUpload };
