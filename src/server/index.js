const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const runner = require('./runner');
const createState = require('./state').create;
const configRouter = require('./routers/config');

const createServer = (options) => {
    const app = express();
    const appState = createState(options);
    let running = false;
    app.use(bodyParser.json());
    app.use('/config' configRouter(appState));
    app.http = (port) => {
        const httpServer = http.createServer(app);
        httpServer.listen(port, () => {
            console.log(`chaos begins... check it out on port ${port} over http`);
            if (!running) {
                runner();
                running = true;
            }
        })
    }
    app.https = (port, certs) => {
        const httpsServer = https.createServer(certs, app);
        httpsServer.listen(port, () => {
            console.log(`chaos begins... check it out on port ${port} over https`);
            if (!running) {
                runner();
                running = true;
            }
        })
    }
    return app;
}