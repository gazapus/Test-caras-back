var Test = require('./model');
var User = require('../user/model');

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
    let user = User.findById(req.body.owner);
    if(!user) return res.status(404).send({message: 'There is not valid owner'});
    let test = new Test({
        owner: req.body.owner,
        name: req.body.personalInformation.name,
        lastname:  req.body.personalInformation.lastname,
        age:  req.body.personalInformation.age,
        sex:  req.body.personalInformation.sex,
        institution:  req.body.institutionalInformation.institution,
        grade: req.body.institutionalInformation.grade,
        country: req.body.institutionalInformation.country,
        result: req.body.result
    })
    test.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while creating this data'
            })
        })
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