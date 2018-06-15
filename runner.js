
const state = require('./state');

function finishTask(runStop) {
    const whenToStop = Math.round(Math.random() * state.downtimeInterval);
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(resolve, whenToStop);
    });
    return timeoutPromise.then(() => runStop());
}

function runner (runStart, runFinish) {
    const whenToRun = Math.round(Math.random() * state.eventInterval);
    setTimeout(() => {
        if (state.on) {
            runStart()
                .then(() => finishTask(runFinish))
                .then(() => runner(runStart, runFinish))

        }
    }, whenToRun);
}

module.exports = runner;
