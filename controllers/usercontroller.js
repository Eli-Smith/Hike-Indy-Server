const router = require('express').Router();
const sequelize = require('../db');
const UserModel = sequelize.import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// CREATE NEW USER ROUTE //

router.post('/create', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    UserModel
    .create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10)
    })
    .then( (user) => {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

        res.json({
            user: user,
            message: 'User Created',
            sessionToken: token
        })
    })
    .catch(err => res.send(err))
});

// LOGIN USER ROUTE //

router.post('/login', (req, res) => {

    UserModel.findOne({
        where: {email: req.body.user.email}
    })
    .then( (user) => {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({
                        user: user,
                        message: 'Successfully Authenticated',
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({error: 'Error 502: Bad Gateway'})
                }
            });
        } else {
            res.status(500).send({error: 'Could not verify user'})
        }
    },
    function (err) {
        res.status(501).send({error: 'User not found'})
    }
    )
});

module.exports = router