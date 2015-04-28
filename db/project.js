var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    versions: Array
});


ProjectSchema.static('findByName', function(name, cb) {
    return this.findOne({
        name: name
    }, cb)
});

ProjectSchema.static('findVersions', function(name, cb) {
    return this.findOne({
        name: name
    }, 'versions', cb)
});

ProjectSchema.static('addVersion', function(name, versions, cb) {
    return this.findOneAndUpdate({
        name: name
    }, {versions:versions}, cb)
});




var ProjetModel = mongoose.model('Projet', ProjectSchema);





module.exports = ProjetModel;