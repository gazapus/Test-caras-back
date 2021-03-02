let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Group = require('../group/model');

let schema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    confirmed: { type: Boolean, default: false },
    groups: [{ type: Schema.ObjectId, ref: 'Group' }]
},
    { timestamps: true }
);

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

schema.post('save', async function(doc, next) {
    if(doc.groups.length > 0 ) return next();
    try {
        let universalGroup = new Group({description: 'universal', owner: doc._id})
        await universalGroup.save();
        doc.groups.push(universalGroup._id);
        await doc.save();
    } catch(err) {
        console.log(err);
    }
})

module.exports = mongoose.model('User', schema)