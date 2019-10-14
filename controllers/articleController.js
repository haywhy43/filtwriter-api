const handleArticle = (req, res, db) => {
    db.select("*").from("articles").then(data => {
        res.json(data);
    });
};

module.exports = { handleArticle };
