const router = require('express').Router();
const sequelize = require('../db');
const UserModel = sequelize.import('../models/user');
const AuthTestModel = sequelize.import('../models/auth')

router.get('/getall', (req, res) => {
    let userid = req.user.id;

    AuthTestModel
    .findAll({
        where: {owner: userid}
    })
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/create', (req, res) => {
    let owner = req.user.id;
    let authTestData = req.body.authtestdata;

    AuthTestModel
        .create({
            authtestdata: authTestData,
            owner: owner
        })
        .then(
            function createSuccess(authtestdata){
                res.json({
                    authtestdata: authtestdata
                })
            },
            function createError(err) {
                res.send(500, err.message);
            }
        )
})

module.exports = router;