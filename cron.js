var Nightmare = require('nightmare');
var CronJob = require('cron').CronJob;
var Moment = require('moment');
var vo = require('vo');

var env = require('node-env-file');
env(__dirname + '/.env');

function *run() {
  var moment = Moment();
  var filename = moment.format('YYYYMMDD.png');
  var nightmare = Nightmare();
  var title = yield nightmare
        .viewport(2048, 1280)
        .goto(process.env.URL)
        .wait(10000)
        .screenshot(filename)
        .evaluate(function() {
          return document.title;
        });
  yield nightmare.end();
}

new CronJob('0 0 10 * * *', function() {
  vo(run)(function(err, result) {
    if (err) throw err;
  });
}, null, true, null);
