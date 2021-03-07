let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const TestFunctions = require('./utils/test_functions');

let schema = new Schema({
    createdAt: { type: Date, default: Date.now },
    owner: { type: Schema.ObjectId, ref: 'User' },
    name: String,
    lastname: String,
    age: Number,
    sex: String,
    institution: String,
    grade: String,
    country: String,
    selectedFaces: [Number],
    result: Schema.Types.Mixed
});

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

schema.post("save", async function (doc, next) {
    if(doc.result) return next();
    console.log("asdasd")
    let grossResults = TestFunctions.calculateResults(doc.selectedFaces);
    let diagnosisResults = TestFunctions.diagnoseResults(grossResults);
    let results = {
        successes: grossResults.successes,
        successesEnneatype: grossResults.successesEnneatype,
        successesPercentile: grossResults.successesPercentile,
        errors: grossResults.errors,
        errorsEnneatype: grossResults.errorsEnneatype,
        errorsPercentile: grossResults.errorsPercentile,
        netSuccesses: grossResults.netSuccesses,
        netSuccessesEnneatype: grossResults.netSuccessesEnneatype,
        netSuccessesPercentile: grossResults.netSuccessesPercentile,
        ici: grossResults.ici,
        iciEnneatype: grossResults.iciEnneatype,
        iciPercentile: grossResults.iciPercentile,
        subtype: diagnosisResults.subtype,
        answerType: diagnosisResults.answerType,
        perfomance: diagnosisResults.perfomance,
        impulsivityControl: diagnosisResults.impulsivityControl,
        diagnosis: diagnosisResults.diagnosis
    }
    doc.result = results;
    doc.save()
        .then(res => next())
        .catch(err => next(new Error("error al procesar")))
})

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