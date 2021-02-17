var User = require('../apiServices/user/model');
const secret = require("../secret");

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

let verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) return res.status(403).send({ message: "No token provided!" });
    jwt.verify(token, secret.SECRET_JWT_SIGN, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized!" });
        req.userId = decoded.id;
        next();
    });
};

const authValidation = {
    checkDuplicatedEmail,
    verifyToken
};

module.exports = authValidation