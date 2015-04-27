var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
    name: String,
    description: String
});

var ProjetModel = mongoose.model('Projet',ProjectSchema);


module.exports = ProjetModel;