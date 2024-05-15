const CronJob = require('cron').CronJob;
const pasaghyrService = require('../services/pasaghyr.service')
const fs = require('fs');

function startSummaryJob() {
    const job = new CronJob(
        '*/10 * * * * *',
        async () => {
            const pasaghyr = await pasaghyrService.find();
            summary = 0;
            pasaghyr.items.forEach((item) => {
                summary += item.weightBaggage;
            })
            console.log('Summary baggage weight: ' + summary);
        },
    );

    job.start();
}

module.exports = startSummaryJob;