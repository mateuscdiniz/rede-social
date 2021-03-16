const mongoose = require('mongoose');

const postagemSchema = new mongoose.Schema({
  titulo: {type: String, required: true},
  texto: {type: String, required: true},
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }  
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Postagem', postagemSchema);
