var Test = require('./model');

exports.find_all = function(req, res) {
    Test.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving results "})
        })
}

exports.find_one = function (req, res) {
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

exports.create = function (req, res) {
    let result = {
        successes: res.body.testInformation.successes,
        successesEnneatype: res.body.testInformation.successesEnneatype,
        successesPercentile: res.body.testInformation.successesPercentile,
        errors: res.body.testInformation.errors,
        errorsEnneatype: res.body.testInformation.errorsEnneatype,
        errorsPercentile: res.body.testInformation.errorsPercentile,
        netSuccesses: res.body.testInformation.netSuccesses,
        netSuccessesEnneatype: res.body.testInformation.netSuccessesEnneatype,
        netSuccessesPercentile: res.body.testInformation.netSuccessesPercentile,
        ici: res.body.testInformation.ici,
        iciEnneatype: res.body.testInformation.iciEnneatype,
        iciPercentile: res.body.testInformation.iciPercentile,
        subtype: res.body.testInformation.subtype,
        answerType: res.body.testInformation.answerType,
        perfomance: res.body.testInformation.perfomance,
        impulsivityControl: res.body.testInformation.impulsivityControl,
        diagnosis: res.body.testInformation.diagnosis
    }
    let test = new Test({
        instituionalInformation: req.body.institutional,
        name: res.body.personalInformation.name,
        lastname: res.body.personalInformation.lastname,
        age: res.body.personalInformation.age,
        sex: res.body.personalInformation.sex,
        result: result
    })
    test.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while creating this result'
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Result.findByIdAndRemove(id)
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
    Result.deleteMany({})
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