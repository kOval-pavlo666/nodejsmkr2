
const config = require('../config');
const startHeartBeatJob = require('./heartbeat.job');
const startSummaryJob = require('./summary.job');

function start() {
    if (!config.enableScheduleJobs) {
        console.warn('Jobs scheduling is not enabled.');
        return;
    }

    startHeartBeatJob();
    startSummaryJob();
}

module.exports = start;