const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Apartment = require('../models/apartment');
const _ = require('lodash');
const authenticate = require('../middleware/authenticate');

//POST /apartments

router.post('/apartments', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const newApartment = new Apartment(body);
    newApartment.save().then(() => {
        return newApartment.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(newApartment);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//POST /apartments/login
router.post('/apartments/login',(req,res) => {
    const body = _.pick(req.body,['email','password']);
    Apartment.findByCredentials(body.email,body.password).then((apartment) => {
        apartment.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(apartment);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });

});

//DELETE /apartments/me/token
router.delete('/apartments/me/token',authenticate,(req,res) => {
    req.apartment.removeToken(req.token).then(() => {
        res.status(200).send();
    },() => {
        res.status(400).send();
    });
});

//GET /apartments/me
router.get('/apartments/me',authenticate,(req,res) => {
    res.send(req.apartment);
});

module.exports = router;