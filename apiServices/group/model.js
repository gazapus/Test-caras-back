const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    description: String,    
    createdAt: {type: Date, default: Date.now()},
    institution: {type: String, default: 'No especificado' },
    grade: {type: String, default: 'No especificado' },
    expiration_time: {type: Date, default: new Date(2100, 1, 1)},
    max_uses: {type: Number, default: 1000000},
    owner: { type: Schema.ObjectId, ref: 'User' },    
    country: { type: String, default: 'España' },
    tests: [{ type: Schema.ObjectId, ref: 'Test' }],
})

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Group', schema)