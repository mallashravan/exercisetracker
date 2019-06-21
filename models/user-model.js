const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    username: String,
    logs: [{
        description: String,
        duration: Number,
        date: { type: Date, default: new Date() }
    }]

});
// UrlSchema.pre('save', function (next) {
//     var doc = this;
//     Counter.findByIdAndUpdate({ _id: 'urlId' }, { $inc: { seq: 1 } }, function (error, counter) {
//         if (error)
//             return next(error);
//         doc.short_url = counter.seq;
//         next();
//     });
// });
var User = mongoose.model('User', UserSchema);
module.exports = User;