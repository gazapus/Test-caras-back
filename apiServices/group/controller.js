var Group = require('./model');

exports.get_all = function (req, res) {
    Group.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving data" })
        })
}

exports.get_one = function (req, res) {
    const id = req.params.id;
    Group.findById(id)
        .then(data => {
            if (data)
                res.send(data);
            else
                res.status(404).send({ message: "Not found result with id " + id });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Error retrieving result with id=" + id });
        });
};

exports.create = function (req, res) {
    let group = new Group({
        comment: req.body.comment,
        institution: req.body.institution,
        grade: req.body.grade,
        expiration_time: req.body.expiration_time,
        max_uses: req.body.max_uses,
        owner: req.body.owner,
        country: req.body.country,
        tests: []
    })
    group.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while creating this data'
            })
        })
}

exports.update_one = function (req, res) {
    const id = req.params.id;
    Group.findByIdAndUpdate(id, {
        comment: req.body.comment,
        institution: req.body.institution,
        grade: req.body.grade,
        expiration_time: req.body.expiration_time,
        max_uses: req.body.max_uses
    })
        .then(data => {
            if (data)
                res.send(data);
            else
                res.status(404).send({ message: "Not found result with id " + id });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Error retrieving result with id=" + id });
        });
}

exports.delete_one = (req, res) => {
    const id = req.params.id;
    Group.findByIdAndRemove(id)
        .then(data => {
            if (data) {
                res.send({
                    message: "result was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete result with id=${id}. Probably result was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete result with id=" + id
            });
        });
};

exports.delete_all = (req, res) => {
    Group.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} results were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all results."
            });
        });
};

exports.add_test = async function (req, res) {
    let group;
    try {
        group = await Group.findOne({_id: req.params.id });
        group.tests.push(req.body.test_id);
        group.save();
        res.status(200).send("Ok");
    } catch(err) {
        if(!group) return res.status(404).send({message: "Group not found"});
        res.status(500).send({ message: err.message || "Error retrieving result"})
    }
}