/**
 * @function handleArticles
 * @description Return all articles in db
 * @param {*} req
 * @param {*} res
 * @param {*} db
 */

const handleArticles = (req, res, db) => {
    db.select("*")
        .from("articles")
        .then(data => {
            res.json(data);
        });
};

/**
 * @function handleUpload
 * @description Upload a new article to the db
 * @param {*} req
 * @param {*} res
 * @param {*} cloudinary
 * @param {*} db
 */
const handleUpload = (req, res, cloudinary, db) => {
    const { author, title, body } = req.body;
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        db("articles")
            .insert({
                author: author,
                title: title,
                body: body,
                profile_id: result.public_id,
                created: "now",
                is_published: false
            })
            .then(data => {
                res.status(200).json("Success");
            })
            .catch(error => {
                res.status(400).json("Failed");
            });
    });
};

/**
 * @function handleEdit
 * @description edit an existing article and updating in db
 * @param {*} req
 * @param {*} res
 * @param {*} cloudinary
 * @param {*} db
 */

const handleEdit = (req, res, cloudinary, db) => {
    const { author, title, body, profile_id, id } = req.body;
    const update = result => {
        db("articles")
            .where({ id: id })
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

/**
 * @function handlePublish
 * @description Publish an article
 * @param {*} req
 * @param {*} res
 * @param {*} cloudinary
 * @param {*} db
 */

const handlePublish = (req, res, db) => {
    const { id } = req.body;
    db("articles")
        .where({ id: id })
        .update({ is_published: true })
        .then(data => {
            res.json({
                success: "true",
                message: "Article Published."
            });
        })
        .catch(error => {
            res.json({
                error: true,
                message: "Unable to publish Article, please try again"
            });
        });
};

/**
 * @function handleDelete
 * @description Delete an article
 * @param {*} req
 * @param {*} res
 * @param {*} db
 */

const handleDelete = (req, res, db) => {
    db("articles")
        .where({ id: req.body.id })
        .del()
        .then(data => {
            res.json("success");
        });
};

export default { handleUpload, handleEdit, handlePublish, handleDelete, handleArticles };
