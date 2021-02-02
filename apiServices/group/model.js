const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    comment: {
        type: String,
        default: ''
    },    
    createdAt: {type: Date, default: Date.now()},
    institution: String,
    grade: String,
    expiration_time: Date,
    max_uses: Number,
    owner: { type: Schema.ObjectId, ref: 'User' },    
    country: {
        type: String,
        required: true,
        default: 'España'
    },
    tests: [{ type: Schema.ObjectId, ref: 'Test' }],
})

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Group', schema)