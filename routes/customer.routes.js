const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Customer = require('../models/customer');
const _ = require('lodash');
const authenticate = require('../middleware/authenticate');

//POST /customers

router.post('/customers', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const newCustomer = new Customer(body);
    newCustomer.save().then(() => {
        return newCustomer.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(newCustomer);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

//POST /customers/login
router.post('/customers/login',(req,res) => {
    const body = _.pick(req.body,['email','password']);
    Customer.findByCredentials(body.email,body.password).then((customer) => {
        customer.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(customer);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });

});

//DELETE /customers/me/token
router.delete('/customers/me/token',authenticate,(req,res) => {
    req.customer.removeToken(req.token).then(() => {
        res.status(200).send();
    },() => {
        res.status(400).send();
    });
});

//GET /customers/me
router.get('/customers/me',authenticate,(req,res) => {
    res.send(req.customer);
});

module.exports = router;