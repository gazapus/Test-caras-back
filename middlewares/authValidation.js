var User = require('../apiServices/user/model');

let checkDuplicatedEmail = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(500).send({ message: err });
            if (user) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
            next();
        })
};

const authValidation = {
    checkDuplicatedEmail
};

module.exports = authValidation