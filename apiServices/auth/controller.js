var User = require('./model');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const secret = require("../../secret");

exports.sign_in = async function (req, res) {
    const A_DAY_IN_MS = 86400;
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send({ message: "User not found" });
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (isPasswordValid) {
            var token = jwt.sign({ id: user.id }, secret.SECRET_JWT_SIGN, { expiresIn: A_DAY_IN_MS });
            res.status(200).send({
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                accessToken: token
            });
        } else {
            return res.status(404).send({ message: "Invalid password" });
        }
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

exports.sign_up = async function (req, res) {
    const SALT_ROUNDS = 10;
    try {
        const hashPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        let user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashPassword,
        })
        user.save()
            .then(data => {
                return res.status(200).send(data);
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || 'Some error occurred while creating this data'
                })
            })
    } catch (err) {
        return res.status(500).send({ message: err.message || 'Server Error' });
    }
}