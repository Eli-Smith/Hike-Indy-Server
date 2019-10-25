const router = require('express').Router();
const sequelize = require('../db');
const VisitModel = sequelize.import('../models/tovisit');

// ADD A TRAIL TO THE TO VISIT LIST //

router.post('/add', (req, res) => {
    let trailName = req.body.trailName
    let owner = req.user.id

    VisitModel
        .create({
            trailName: trailName,
            owner: owner
        })
        .then(trail => res.status(200).json({
            trail: trail,
            message: 'Added to List',
        }))
        .catch(err => res.status(err))
});

// VIEW ALL TRAILS ON A USERS TO VISIT LIST //

router.get('/viewlist', (req, res) => {
    let owner = req.user.id

    VisitModel.findAll({
        where: {owner: owner}
    })
    .then(data => res.json(data))
    .catch(err => res.status(err))
})

// REMOVE TRAIL FROM TO VISIT LIST //

router.delete('/remove/:id', (req, res) => {
    let owner = req.user.id;
    let trail = req.params.id

    VisitModel
    .destroy({
        where: {owner: owner, id: trail}
    })
    .then( res.status(200).send('Log Deleted'))
    .catch(err => res.status(err));
    
})

module.exports = router