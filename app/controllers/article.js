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
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json("Sorry, an error has occured.");
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
const handleArticleCreate = (req, res, cloudinary, db) => {
    const { author, title } = req.body;
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        db.transaction((trx) => {
            trx.insert({
                author: author,
                title: title,
                body: "",
                profile_id: result.public_id,
                created: "now",
                is_published: false
            })
                .into("articles")
                .returning("*")
                .then((data) => {
                    return trx("dashboard_data")
                        .increment("no_of_saved_articles", 1)
                        .then((response) =>
                            res.json({ success: "true", message: "Dashboard data updated successfully" })
                        )
                        .catch((error) => res.json({ error: "true", message: "Unable to update dashboard data" }));
                })
                .then(trx.commit)
                .catch(trx.rollback);
        });
    });
};


/**
 * @function handleImageUpload
 * @description Upload a image to cloudinary
 * @param {*} req
 * @param {*} res
 * @param {*} cloudinary
 */
const handleImageUpload = (req, res, cloudinary) => {
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        res.json({ url: result.url });
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
    const { body, id } = req.body;
    db("articles")
        .where({ id: id })
        .update({
            body
        })
        .returning("*")
        .then((data) => {
            res.json(data);
        });
};

/**
 * @function handlePublish
 * @description Publish an article
 * @param {*} req
 * @param {*} res
 * @param {*} db
 */

const handlePublish = (req, res, db) => {
    const { id } = req.body;
    db("articles")
        .where({ id: id })
        .update({ is_published: true })
        .then((data) => {
            db("dashboard_data")
                .increment("no_of_published_articles", 1)
                .then((data) => res.json({ success: true, message: "Dashboard data updated successfully" }))
                .catch((error) => {
                    res.json({ error: true, message: "unable to update dashboard data" });
                });
        })
        .catch((error) => {
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
        .then((data) => {
            db("dashboard_data")
                .decrement("no_of_saved_articles", 1)
                .then((data) => {
                    res.json({ success: true, message: "Dashboard data updated successfully" });
                })
                .catch((error) => {
                    res.json({ error: true, message: "Unable to update dashboard data" });
                });
        })
        .catch((error) => {
            res.json({ error: true, message: "Unable to delete article, please try again." });
        });
};

module.exports = {
    handleArticleCreate,
    handleEdit,
    handlePublish,
    handleDelete,
    handleArticles,
    handleImageUpload,
};
