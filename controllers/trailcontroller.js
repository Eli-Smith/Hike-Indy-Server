const router = require('express').Router();
const sequelize = require('../db')
const TrailModel = sequelize.import('../models/trail');

// CREATE A NEW TRAIL LOG ROUTE //

router.post('/log', (req, res) => {
    let trailName = req.body.trailName
    let distance = req.body.distance
    let description = req.body.description
    let difficulty = req.body.difficulty
    let rating = req.body.rating
    let owner = req.user.id

    TrailModel
        .create({
            trailName: trailName,
            distance: distance,
            description: description,
            difficulty: difficulty,
            rating: rating,
            owner: owner
        })
        .then(trail => res.status(200).json({
            trail: trail,
            message: 'Trail Logged',
        }))
        .catch(err => res.status(err))
});

// VIEW ALL TRAIL LOGS BY USER //

router.get('/view', (req, res) => {
    let userId = req.user.id

    TrailModel.findAll({
        where: {owner: userId}
    })
    .then( function viewSuccess(trails){
        res.json(trails)
    })
    .catch(err => res.status(err))
});

// DELETE LOG BY ID //

router.delete('/delete/:id', (req, res) =>{
    let log = req.params.id;
    let userId = req.user.id;

    TrailModel
    .destroy({
        where: {id: log, owner: userId}
    })
    .then( res.send({message: 'Log Deleted'}))
    .catch( err => res.status(err));

});

// UPDATE LOG BY ID //

router.put('/update/:id', (req, res) =>{
    let log = req.params.id
    let userId = req.user.id

    let newTrailName = req.body.trailName;
    let newDistance = req.body.distance;
    let newDesc = req.body.description;
    let newDiff = req.body.difficulty;
    let newRating = req.body.rating

    TrailModel
    .update({
        trailName: newTrailName,
        distance: newDistance,
        description: newDesc,
        difficulty: newDiff,
        rating: newRating
    },
    {where: {id: log, owner: userId}})
    .then(trail => res.status(200).json({newTrail: trail, message: 'Log Updated'}))
    .catch(err => res.status(err))
})

module.exports = router