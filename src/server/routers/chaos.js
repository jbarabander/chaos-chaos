const express = require('express');
const router = express.Router();

const chaosRouter = (state) => {
    router.use('*', (req, res, next) => {
        if (state.disruptRegex && state.disruptRegex.exec(req.url)) {
            return res.sendStatus(500);
        }
        return next();
    });
    return router;
};

module.exports = chaosRouter;