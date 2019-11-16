const dashboardController = (req, res, db) => {
    db.select("*")
        .from("dashboard_data")
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json("Sorry, an error has occured.");
        });
};

module.exports = {
    dashboardController
};
