var rp = require('request-promise');
var { clear } = require('./endpoints');
function turnOnEndpoint(state) {
    clear(state);
    return rp({
        method: 'POST',
        uri: state.remote,
        body: {
            disruptedEndpoint: null,
            duration: null
        },
        json: true,
    });
}

module.exports = turnOnEndpoint;