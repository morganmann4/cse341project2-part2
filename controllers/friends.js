const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllFriends = (req, res) => {
    //#swagger.tags=['Friends']
    mongodb
      .getDb()
      .db()
      .collection('friends')
      .find()
      .toArray((err, lists) => {
        if (err){
          res.status(400).json( { messages: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingleFriends = async (req, res) => {
    //#swagger.tags=['Friends']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid friend id to find a freind')
      }
      const friendId = new ObjectId(req.params.id);
        mongodb
        .getDb()
        .db()
        .collection('friends')
        .find({ _id: friendId })
        .toArray((err, result) => {
          if (err){
            res.status(400).json( { messages: err });
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result[0]);
        });
};

// const getAllFriends = async (req, res) => {
//     // const friendId = new ObjectId(req.params.id)
//     const result = await mongodb.getDb().db().collection('friends').find();
//     result.toArray().then((friends) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(friends);
//     });
// };

// const getSingleFriends = async (req, res) => {
//     //#swagger.tags=['Friends']
//     const friendId = new ObjectId(req.params.id)
//     const result = await mongodb.getDb().db().collection('friends').find({_id: friendId});
//     result.toArray().then((friends) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(friends[0]);
//     });
// };


const createFriend = async (req, res) => {
    //#swagger.tags=['Friends']
    const friend = {
        age: req.body.age,
        email: req.body.email,
        favoriteNumber: req.body.favoriteNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation,
        phoneNumber: req.body.phoneNumber
    };
    const response = await mongodb.getDb().db().collection('friends').insertOne(friend);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the friend')
    }
};

const updateFriend = async (req, res) => {
    //#swagger.tags=['Friends']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid friend id to update a friend')
      }
    const friendId = new ObjectId(req.params.id)
    const friend = {
        age: req.body.age,
        email: req.body.email,
        favoriteNumber: req.body.favoriteNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation,
        phoneNumber: req.body.phoneNumber
    };
    const response = await mongodb.getDb().db().collection('friends').replaceOne({ _id: friendId }, friend);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the friend')
    }
};

const deleteFriend = async (req, res) => {
    //#swagger.tags=['Friends']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid friend id to delete a friend')
      }    
    const friendId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('friends').deleteOne({ _id: friendId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleteing the friend')
    }
};

module.exports = {
    getAllFriends,
    getSingleFriends,
    createFriend,
    updateFriend,
    deleteFriend
};