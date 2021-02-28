let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    user_id: mongoose.Types.ObjectId,
    originalEmail: String,
    newEmail: String,
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

module.exports = mongoose.model('RequestChange', schema);