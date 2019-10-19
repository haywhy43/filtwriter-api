const handleUpload = (req, res, cloudinary, db) => {
    // cloudinary.config(setting.cloudinary);
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

const handleEdit = (req, res, cloudinary, db) => {
    const { author, title, body, profile_id } = req.body;
    const update = result => {
        db("articles")
            .where({ id: req.body.id })
            .update({
                title: title,
                author: author,
                body: body,
                profile_id: result ? result.public_id : profile_id
            })
            .then(data => {
                res.json(data);
            });
    };
    if (req.file) {
        cloudinary.uploader.upload(req.file.path, function(error, result) {
            update(result);
        });
    } else {
        update();
    }
};

module.exports = { handleUpload, handleEdit };
