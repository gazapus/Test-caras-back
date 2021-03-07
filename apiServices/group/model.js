const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    description: String,    
    createdAt: {type: Date, default: Date.now()},
    institution: {type: String, default: 'No especificado', required: true },
    grade: {type: String, default: 'No especificado' },
    expiration_time: {type: Date, default: new Date(2100, 1, 1)},
    max_uses: {type: Number, default: 1000000},
    owner: { type: Schema.ObjectId, ref: 'User', required: true },    
    country: { type: String, default: 'España' },
    tests: [{ type: Schema.ObjectId, ref: 'Test' }],
})

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

schema.post("save", async function (doc, next) {
    if(doc.description === "universal") return next();
    let User = require('../user/model');
    try {
        let user = await User.findById(doc.owner);
        user.groups.push(doc);
        await user.save();
    } catch(err) {
        console.log(err);
        let error = new Error('No se pudo, duro');
        next(error)
    }
})

module.exports = mongoose.model('Group', schema)