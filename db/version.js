var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VersionSchema = new mongoose.Schema({
    name: String,
    date: Date,
    prd: {
        mapping: String,
        time: Date
    },
    prototype: {
        mapping: String,
        time: Date
    },
    visual: {
        mapping: String,
        time: Date
    }
});

VersionSchema.static('findByName', function(name, cb) {
    return this.findOne({
        name: name
    }, cb)
});


var VersionModel = mongoose.model('Version', VersionSchema);
module.exports = VersionModel;