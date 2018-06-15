const mergeState = require('../state').merge;
const express = require('express');
const router = express.Router();

const configRouter = (state) => {
    router.post('/', (req, res) => {
        delete req.body.remote;
        mergeState(state, req.body);
        res.sendStatus(201);
    });
    router.put('/on', (req, res) => {
        mergeState(state, {on: !!req.body});
        res.sendStatus(201);
    });
    router.put('/downtimeInterval', (req, res) => {
        mergeState(state, {downtimeInterval: req.body});
        res.sendStatus(201);
    });
    router.put('/eventInterval', (req, res) => {
        mergeState(state, {eventInterval: req.body});
        res.sendStatus(201);
    });
    router.put('/endpoints', (req, res) => {
        mergeState(state, {endpoints: req.body});
        res.sendStatus(201);
    })
};

module.exports = configRouter;