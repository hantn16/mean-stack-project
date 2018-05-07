const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Seller = require('../models/seller');
const _ = require('lodash');
const authenticate = require('../middleware/authenticate');

//POST /sellers

router.post('/sellers', authenticate, (req, res) => {
    const body = _.pick(req.body, ['name', 'taxCode', 'address']);
    body._creator = req.user._id;
    const newSeller = new Seller(body);
    newSeller.save().then((seller) => {
        res.send(seller);
    }, (err) => {
        res.status(400).send(err);
    })
});

//GET /sellers
app.get('/sellers',authenticate, (req, res) => {
    Seller.find().then((sellers) => {
        res.send({ sellers });
    }, (err) => {
        res.status(400).send(err);
    });
});

//GET /sellers/12323434
app.get('/sellers/:id',authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Seller.findOne({
        _id: id
    }).then((seller) => {
        if (!seller) {
            return res.status(404).send();
        }
        return res.status(200).send({ seller });
    }, (err) => {
        return res.status(404).send();
    });
});

//DELETE /sellers/:id
app.delete('/sellers/:id',authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
        // throw new Error('id is not valid');
    }
    Seller.findOneAndRemove({
        _id: id
    }).then((seller) => {
        if (!seller) {
            return res.status(404).send();
        }
        return res.status(200).send({ seller });
    }, (err) => {
        return res.status(400).send(err);
    });
});

//PATCH /sellers/:id
app.patch(`/sellers/:id`,authenticate, (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name', 'taxCode', 'address']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // if (_.isBoolean(body.completed) && body.completed) {
    //     body.completedAt = new Date().getTime();
    // } else {
    //     body.completed = false;
    //     body.completedAt = null;
    // }
    Seller.findOneAndUpdate({
        _id: id
    }, {
        $set: body
    }, { new: true }).then((seller) => {
        if (!seller) {
            res.status(404).send();
        }
        res.send({ seller });
    }).catch((e) => {
        res.status(400).send()
    });
});
module.exports = router;