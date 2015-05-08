var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Version = require('./version');



var ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    updateTime:Date,
    versions: [{
        type: Schema.Types.ObjectId,
        ref: 'Version'
    }]
});


ProjectSchema.static('findByName', function(name, cb) {
    return this.findOne({
        name: name
    }, cb)
});

ProjectSchema.static('findVersions', function(name, cb) {
    return this.findOne({
        name: name
    }).populate('versions').exec(cb);
});

// ProjectSchema.static('findOneVersion', function(name, version, cb) {
//     return this.findOne({
//         name: name
//     }).populate({
//         path: 'versions',
//         match: {
//             name: version
//         }
//     }).exec(cb);
// });

// ProjectSchema.static('addVersion', function(name, versions, cb) {
//     return this.findOneAndUpdate({
//         name: name
//     }, {
//         versions: versions
//     }, cb)
// });


var ProjetModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjetModel;