const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['cars']
    mongodb
      .getDb()
      .db()
      .collection('cars')
      .find()
      .toArray((err, lists) => {
        if (err){
          res.status(400).json( { messages: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['cars']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid car id to find a car')
      }
      const carId = new ObjectId(req.params.id);
        mongodb
        .getDb()
        .db()
        .collection('cars')
        .find({ _id: carId })
        .toArray((err, result) => {
          if (err){
            res.status(400).json( { messages: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result[0]);
        });
};

// const getAll = async (req, res) => {
//     //#swagger.tags=['Freinds']
//     const carId = new ObjectId(req.params.id)
//     const result = await mongodb.getDb().db().collection('cars').find();
//     result.toArray().then((cars) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(cars);
//     });
// };

// const getSingle = async (req, res) => {
//     //#swagger.tags=['cars']
//     const carId = new ObjectId(req.params.id)
//     const result = await mongodb.getDb().db().collection('cars').find({_id: carId});
//     result.toArray().then((cars) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(cars[0]);
//     });
// };


const createCar = async (req, res) => {
    //#swagger.tags=['cars']
    const car = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color

    };
    const response = await mongodb.getDb().db().collection('cars').insertOne(car);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the car')
    }
};

const updateCar = async (req, res) => {
    //#swagger.tags=['cars']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid car id to update a car')
      }
    const carId = new ObjectId(req.params.id)
    const car = {
  make: req.body.make,
        model: req.body.model,
        color: req.body.color
    };
    const response = await mongodb.getDb().db().collection('cars').replaceOne({ _id: carId }, car);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the car')
    }
};

const deleteCar = async (req, res) => {
    //#swagger.tags=['cars']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid car id to delete a car')
      }    
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('cars').deleteOne({ _id: carId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleteing the car')
    }
};

module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar
};