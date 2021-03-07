var Test = require('./model');
var Group = require('../group/model');

exports.get_all = function (req, res) {
    Test.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving data" })
        })
}

exports.get_one = function (req, res) {
    const id = req.params.id;
    Test.findById(id)
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

exports.create = async function (req, res) {
    try {
        let group = await Group.findById(req.body.group_id);
        const user = req.body.user;
        if (!group) return res.status(404).send({ message: 'Grupo no encontrado' });
        let test = new Test({
            owner: group.owner,
            name: user.name,
            lastname: user.lastname,
            age: user.age,
            sex: user.sex,
            institution: group.requestInstitutionalInfo() ? user.institution : group.institution,
            grade: group.requestInstitutionalInfo() ? user.grade : group.grade,
            country: group.country,
            selectedFaces: req.body.selectedFaces,
        })
        let testSaved = await test.save();
        return res.status(200).send(testSaved);
    } catch (err) {
        console.log(err)
    }
}

exports.delete_one = (req, res) => {
    const id = req.params.id;
    Test.findByIdAndRemove(id)
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
    Test.deleteMany({})
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