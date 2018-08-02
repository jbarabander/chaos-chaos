
const mergeState = require('./state').merge;

function pick(state) {
    const endpointToDisrupt = state.endpoints[Math.floor(Math.random() * state.endpoints.length)];
    mergeState(state, {
        currentDisruptedEndpoint: endpointToDisrupt
    });
}

function clear(state) {
    state.currentDisruptedEndpoint = null;
    state.disruptRegex = null;
}

module.exports = {
    pick,
    clear
}