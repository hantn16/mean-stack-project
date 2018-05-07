const express = require('express');
const router = express.Router();
const mongoose = require('../db/mongoose');
const bodyParser = require('body-parser');
const Contract = require('../models/contract');
const _ = require('lodash');
const {authenticate} = require('../middleware/authenticate');

//POST /contracts

router.post('/contracts', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const newContract = new Contract(body);
    newContract.save().then(() => {
        return newContract.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(newContract);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//POST /contracts/login
router.post('/contracts/login',(req,res) => {
    const body = _.pick(req.body,['email','password']);
    Contract.findByCredentials(body.email,body.password).then((contract) => {
        contract.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(contract);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });

});

//DELETE /contracts/me/token
router.delete('/contracts/me/token',authenticate,(req,res) => {
    req.contract.removeToken(req.token).then(() => {
        res.status(200).send();
    },() => {
        res.status(400).send();
    });
});

//GET /contracts/me
router.get('/contracts/me',authenticate,(req,res) => {
    res.send(req.contract);
});

module.exports = router;