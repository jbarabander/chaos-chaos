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
        }
    });
}

module.exports = turnOnEndpoint;