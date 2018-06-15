function finishTask(downtimeInterval, runStop) {
    const whenToStop = Math.round(Math.random() * downtimeInterval);
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(resolve, whenToStop);
    });
    return timeoutPromise.then(() => runStop());
}

function runner (runStart, runFinish, state) {
    const whenToRun = Math.round(Math.random() * state.eventInterval);
    setTimeout(() => {
        if (state.on) {
            runStart()
                .then(() => finishTask(runFinish), state.downtimeInterval)
                .then(() => runner(runStart, runFinish, state))

        }
    }, whenToRun);
}

module.exports = runner;
