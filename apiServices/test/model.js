let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    createdAt: { type: Date, default: Date.now },
    owner: { type: Schema.ObjectId, ref: 'User' },
    name: String,
    lastname: String,
    age: Number,
    sex: String,
    instituionalInformation: { type: Schema.ObjectId, ref: 'Institutional' },
    result: {
        successes: Number,
        successesEnneatype: Number,
        successesPercentile: Number,
        errors: Number,
        errorsEnneatype: Number,
        errorsPercentile: Number,
        netSuccesses: Number,
        netSuccessesEnneatype: Number,
        netSuccessesPercentile: Number,
        ici: Number,
        iciEnneatype: Number,
        iciPercentile: Number,
        subtype: String,
        answerType: String,
        perfomance: String,
        impulsivityControl: String,
        diagnosis: String
    }
});

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Test', schema)


/*

var TaskSchema = new Schema({
    name            : String,
    lastPerformed   : Date,
    folder          : String,
    user            : {type: Schema.ObjectId, ref: 'User'} // assuming you name your model User
});
With this, your query for all users, including arrays of their tasks might be:

User.find({}).populate('tasks').run(function(err, users) {
  // do something
});*/