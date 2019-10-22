const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const TestModel = sequelize.import('../models/test')

router.post('/one', (req, res) => {
    res.send('Got a post request')
});

router.post('/two', (req, res) => {
    let testData = 'Test data for endpoint two';

    TestModel.create({
        testdata: testData
    })
    .then( () => res.send('Test two went through'))
})

router.post('/three', (req, res) => {
    let testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    res.send('Test Three went through!')
    console.log('Test 3')
})

module.exports = router;