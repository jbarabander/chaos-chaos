const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const runner = require('./runner');
const createState = require('./state').create;
const configRouter = require('./routers/config');
const chaosRouter = require('./routes/chaos');

const createServer = (options) => {
    const app = express();
    const appState = createState(options);
    let running = false;
    let baseRoutesHaveBeenAdded = false;
    const startRunnerIfNeeded = () => {
        if (!running) {
            runner();
            running = true;
        }
    }
    const addBaseRoutesIfNeeded = () => {
        if (!baseRoutesHaveBeenAdded) {
            app.use('/config' configRouter(appState));
            app.use('/chaos', chaosRouter(appState));
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
    return app;
}