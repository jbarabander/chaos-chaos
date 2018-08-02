const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const runner = require('./runner');
const createState = require('./state').create;
const turnOffEndpoint = require('./turnOffEndpoint');
const turnOnEndpoint = require('./turnOnEndpoint');
const endpoints = require('./endpoints');
const configRouter = require('./routers/config');
const chaosRouter = require('./routes/chaos');

const createServer = (options) => {
    const app = express();
    const appState = createState(options);
    let running = false;
    let baseRoutesHaveBeenAdded = false;
    const runFinish = () => {
        turnOnEndpoint(appState);
    }
    const startRunnerIfNeeded = () => {
        if (!running) {
            runner(turnOffEndpoint, runFinish, appState);
            running = true;
        }
    }
    const addBaseRoutesIfNeeded = () => {
        if (!baseRoutesHaveBeenAdded) {
            app.use('/config' app.configRouter);
            app.use('/chaos', app.chaosRouter);
            baseRoutesHaveBeenAdded = true;
        }
    }
    app.use(bodyParser.json());
    app.http = (port) => {
        addBaseRoutesIfNeeded();
        const httpServer = http.createServer(app);
        httpServer.listen(port, () => {
            console.log(`chaos begins... check it out on port ${port} over http`);
            startRunnerIfNeeded();
        });
    };
    app.https = (port, certs) => {
        addBaseRoutesIfNeeded();
        const httpsServer = https.createServer(certs, app);
        httpsServer.listen(port, () => {
            console.log(`chaos begins... check it out on port ${port} over https`);
            startRunnerIfNeeded();
        });
    };

    app.chaosRouter = chaosRouter(appState);
    app.configRouter = configRouter(appState);
    app.startRunner = () => {
        const separateFinish = () => {
            endpoints.clear(appState);
        }
        const separateStart = () => {
            endpoints.pick(appState);
        }
        runner(separateStart, separateFinish, appState);
    };

    return app;
}