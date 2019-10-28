const router = require('express').Router();
const sequelize = require('../db');
const UserTrailModel = sequelize.import('../models/userTrails');

// CREATE A NEW TRAIL LOG //

router.post('/logtrail', (req, res) => {
    let owner = req.user.id

    UserTrailModel
    .create({
        owner: owner,
        trailName: req.body.trailName,
        difficulty: req.body.difficulty,
        description: req.body.description,
        rating: req.body.rating
    })
    .then(log => res.status(200).json({
        trail: log,
        message: 'Trail Added'
    }))
    .catch(err => res.status(err));
});


// VIEW ALL LOGS FOR USER //

router.get('/viewall', (req, res) =>{
    let owner = req.user.id;

    UserTrailModel
    .findAll({
        where: {owner: owner}
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(err));
});

// UPDATE SINGLE LOG FOR USER //

router.put('/update/:id', (req, res) => {
    let owner = req.user.id;
    let log = req.params.id

    let newTrailName = req.body.trailName;
    let newDiff = req.body.difficulty;
    let newDesc = req.body.description
    let newRating = req.body.rating

    UserTrailModel
    .update({
        trailName: newTrailName,
        difficulty: newDiff,
        description: newDesc,
        rating: newRating
    },
    {where:{owner: owner, id: log}})
    .then(update => res.status(200).json({
        updated: update,
        message: 'Trail Updated'
    }))
    .catch(err => res.status(err))
});

// DELETE SINGLE LOG FOR USER //

router.delete('/delete/:id', (req, res) => {
    let owner = req.user.id
    let log = req.params.id

    UserTrailModel
        .destroy({
            where: {owner: owner, id: log}
        })
        .then(del = res.status(200).send('Log Deleted'))
        .catch(err => res.status(err))
});

module.exports = router;