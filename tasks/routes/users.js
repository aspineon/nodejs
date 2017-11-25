module.exports = APP => {
    const Users = APP.db.models.Users;
    APP.route("/user")
        .all(APP.auth.authenticate())
        .get((req, res) => {
            Users.findById(req.user.id, {
                attributes: ["id", "name", "email"]
            })
                .then(result => res.json(result)).catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            Users.destroy({where: {id: req.user.id}}).then(result => res.sendStatus(204)).catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
    APP.post("/users", (req, res) => {
        Users.create(req.body)
            .then(result => res.json(result)).catch(error => {
            res.status(412).json({msg: error.message});
        });
    });
};