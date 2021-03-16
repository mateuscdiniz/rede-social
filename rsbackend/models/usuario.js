const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Email = require('mongoose-type-email');
const uuidv4 = require('uuid/v4');

const usuarioSchema = new mongoose.Schema({
  email: {type: Email, required: true, unique: true},
  senha: {type: String, required: true},
  validado: {type: Boolean, default: false},
  token_validacao: {type: String, default: uuidv4()},
  data_geracao_token: {type: Date, default: Date.now}
}, { 
  timestamps: true 
});

usuarioSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Usuario', usuarioSchema);
