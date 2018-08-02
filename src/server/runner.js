function finishTask(whenToStop, runStop) {
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(resolve, whenToStop);
    });
    return timeoutPromise.then(() => runStop());
}

function runner (runStart, runFinish, state) {
    const whenToRun = Math.round(Math.random() * state.eventInterval);
    const whenToStop = Math.round(Math.random() * state.downtimeInterval);
    setTimeout(() => {
        if (state.on) {
            runStart(state, whenToStop)
                .then(() => finishTask(whenToStop, runFinish))
                .then(() => runner(runStart, runFinish, state));

        }
    }, whenToRun);
}

module.exports = runner;
