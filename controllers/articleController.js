const handleArticle = (req, res, db) => {
    db.select("*").from("articles").then(data => {
        res.json(data);
    });
};

const handleDelete = (req, res, db) => {
    db("articles")
    .where({id: req.body.id})
    .del()
    .then(data => {
        res.json("sucess")
    })
}
module.exports = { handleArticle, handleDelete };
