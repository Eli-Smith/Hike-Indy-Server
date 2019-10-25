const router = require('express').Router();
const sequelize = require('../db')
const TrailModel = sequelize.import('../models/trail');


// ADD A TRAIL TO THE TRAIL TABLE //

router.post('/addtrail', (req, res) => {
    TrailModel.create({
        trailName: req.body.trailName,
        park: req.body.park,
        address: req.body.address,
        difficulty: req.body.difficulty,
        length: req.body.length
    })
    .then( trail => res.status(200).json({
        trail: trail,
        message: 'Trail added'
    }))
    .catch(err => res.status(err));
});


// VIEW ALL TRAILS FROM THE TRAIL TABLE //

router.get('/viewtrails', (req, res) => {

    TrailModel.findAll()
    .then(trail => res.status(200).json(trail))
    .catch(err => res.status(err))
})

router.get('/viewone:id', (req, res) => {
    let log = req.params.id

    TrailModel
        .findOne({where: {trailname: log}})
        .then(trail => res.status(200).json(trail))
        .catch(err => res.status(err));
})
module.exports = router;