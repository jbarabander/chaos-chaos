const defaults = {
    eventInterval: 1000 * 60 * 60 * 24 * 7,
    downtimeInterval: 1000 * 60 * 5,
    on: true,
    endpoints: [];
    currentDisruptedEndpoint: null,
    remote: null,
};

isTruthyNumber = (num) => num && typeof num === 'number';

const mergeState = (state, options) => {
    if (!options || typeof options !== 'object') {
        return state;
    }
    if (isTruthyNumber(options.eventInterval)) {
        state.eventInterval = options.eventInterval;
    }
    if (isTruthyNumber(options.downtimeInterval)) {
        state.downtimeInterval = options.downtimeInterval;
    }
    if (Array.isArray(options.endpoints)) {
        state.endpoints = options.endpoints;
    }
    if (typeof options.on === 'boolean') {
        state.on = options.on;
    }
    return state;
}

const createState = (options) => {
    const newState = {...defaults};
    if (!options || typeof options !== 'object') {
        return newState;
    }
    return mergeState(newState, options);
}

module.exports = {
    create: createState,
    merge: mergeState
};