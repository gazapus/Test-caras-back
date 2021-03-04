var Group = require('./model');
let Test = require('../test/model');

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
    let groupData = req.body;
    groupData.owner = req.body.userId;
    groupData.tests = [];
    let group = new Group(groupData);
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
        description: req.body.description,
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
    const test_id = req.body.test_id;
    try {
        group = await Group.findOne({_id: req.params.id });
        let test = await Test.findById(test_id);
        if(!test) return res.status(404).send({message: "Test not found"});
        let testExisting = group.tests.find(e => String(e) === String(test_id));
        if(testExisting) return res.status(400).send({message: "Test ya agregado"});
        group.tests.push(test_id);
        await group.save();
        res.status(200).send("Ok");
    } catch(err) {
        if(!group) return res.status(404).send({message: "Group not found"});
        res.status(500).send({ message: err.message || "Error retrieving result"})
    }
}

exports.remove_test = async function (req, res) {
    let group;
    try {
        group = await Group.findOne({_id: req.params.id });
        let indexToRemove = group.tests.findIndex(value => String(value) === String(req.body.test_id));
        if(indexToRemove === -1) return res.status(404).send({message: "Test not found"});
        group.tests.splice(indexToRemove, 1);
        await group.save();
        res.status(200).send("Ok");
    } catch(err) {
        if(!group) return res.status(404).send({message: "Group not found"});
        res.status(500).send({ message: err.message || "Error retrieving result"})
    }
}

exports.get_universal = async function(req, res) {
    try {
        let group = await Group.findOne({description: 'universal', owner: req.body.userId });
        if(group) return res.status(200).send(group);
        return res.status(404).send({message: 'Group not found'})
    } catch(err) {
        res.status(500).send({ message: err.message || "Error retrieving result"})
    }
}