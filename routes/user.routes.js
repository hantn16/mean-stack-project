const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const _ = require('lodash');
const authenticate = require('../middleware/authenticate');

//POST /users

router.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const newUser = new User(body);
    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(newUser);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//POST /users/login
router.post('/users/login',(req,res) => {
    const body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });

});

//DELETE /users/me/token
router.delete('/users/me/token',authenticate,(req,res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    },() => {
        res.status(400).send();
    });
});

//GET /users/me
router.get('/users/me',authenticate,(req,res) => {
    res.send(req.user);
});

module.exports = router;