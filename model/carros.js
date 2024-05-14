const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Carros = new Schema({
  nome: {
    type: String
  },
  marca: {
    type: String
  },
  modelo: {
    type: String
  }
},{
    collection: 'carros'
});

module.exports = mongoose.model('Carros', Carros);