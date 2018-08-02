const rp = require('request-promise');
const { pick } = require('./endpoints');
function turnOffEndpoint(state, duration) {
    pick(state);
    return rp({
        method: 'POST',
        uri: state.remote,
        body: {
            disruptedEndpoint: state.currentDisruptedEndpoint,
            duration
        },
        json: true,
    });
}

module.exports = turnOffEndpoint;