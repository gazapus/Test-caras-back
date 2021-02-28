let ChangeRequest = require('./model');

exports.get_all = async function (req, res) {
    ChangeRequest.find({})
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error retrieving data" }))
}

exports.create = async function (req, res) {
    let changeRequest = new ChangeRequest({
        user_id: req.body.user_id,
        originalEmail: req.body.originalEmail,
        newEmail: req.body.newEmail
    })
    changeRequest.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while creating this request'
            })
        })
}

exports.confirm = async function (req, res) {
    const id = req.params.id;
    ChangeRequest.findOneAndUpdate({_id: id}, {$set: {confirmed: true}})
        .then(data => {
            res.status(200).send({message: 'Confirmación exitosa'});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while updating this request'
            })
        })
}

exports.delete_one = async function (req, res) {
    const id = req.params.id;
    ChangeRequest.findOneAndDelete({_id: id})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while deleting this request'
            })
        })
}