let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    confirmed: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('User', schema)