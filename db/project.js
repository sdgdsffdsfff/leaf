var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
    name: String,
    description: String
});


ProjectSchema.static('findByName', function(name, cb) {
    return this.findOne({
        name: name
    }, cb)
});




var ProjetModel = mongoose.model('Projet', ProjectSchema);





module.exports = ProjetModel;