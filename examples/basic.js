const express = require('express');
const rp = require('request-promise');
const bodyParser = require('body-parser');
const createChaos = require('../src/server');

const chaosServer = createChaos({
    eventInterval: 10000,
    downtimeInterval: 5000,
    remote: 'http://localhost:4000/chaos',
    endpoints: ['/api/hi']
});

const otherApp = express();

let endpointOn = true;

otherApp.use(bodyParser.json());

otherApp.post('/chaos', (req, res) => {
    console.log('hit');
    if (req.body.disruptedEndpoint) {
        endpointOn = false;
    } else {
        endpointOn = true;
    }
    res.sendStatus(200);
})

otherApp.use('/api/hi', (req, res) => {
    if (endpointOn) {
        res.sendStatus(200);
    } else {
        rp({ 
            method: 'GET',
            uri: 'http://localhost:4000/chaos/api/hi'
        })
        .catch((e) => {
            res.sendStatus(500)
        });
    }
})
otherApp.listen(4000, () => {
    console.log('base app listening on port 4000');
});

chaosServer.http(3001);