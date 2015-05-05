var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VersionSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
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

VersionSchema.static('findByName', function(name, uid, cb) {
    console.log(name,uid);
    return this.findOne({
        name: name,
        project: uid
    }, cb);
});

VersionSchema.static('updatePrd', function(name, prd, cb) {
    return this.findOneAndUpdate({
        name: name
    }, {
        prd: prd
    }, cb)
});

VersionSchema.static('updatePrototype', function(name, prototype, cb) {
    return this.findOneAndUpdate({
        name: name
    }, {
        prototype: prototype
    }, cb)
});

VersionSchema.static('updateVisual', function(name, visual, cb) {
    return this.findOneAndUpdate({
        name: name
    }, {
        visual: visual
    }, cb)
});


var VersionModel = mongoose.model('Version', VersionSchema);
module.exports = VersionModel;