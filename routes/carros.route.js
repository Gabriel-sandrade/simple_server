const express = require('express');
const app = express();
const carrosRoutes = express.Router();

let carros = require('../model/carros');

// api to add carros
carrosRoutes.route('/add').post(function (req, res) {
  let carros = new carros(req.body);
  carros.save()
  .then(carros => {
    res.status(200).json({'status': 'success','mssg': 'carros added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get carross
carrosRoutes.route('/').get(function (req, res) {
  carros.find(function (err, carross){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','carross': carross});
    }
  });
});

// api to get carros
carrosRoutes.route('/carros/:id').get(function (req, res) {
  let id = req.params.id;
  carros.findById(id, function (err, carros){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','carros': carros});
    }
  });
});

// api to update route
carrosRoutes.route('/update/:id').put(function (req, res) {
    carros.findById(req.params.id, function(err, carros) {
    if (!carros){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        carros.nome = req.body.nome;
        carros.marca = req.body.marca;
        carros.modelo = req.body.modelo;

        carros.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
carrosRoutes.route('/delete/:id').delete(function (req, res) {
  carros.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = carrosRoutes;