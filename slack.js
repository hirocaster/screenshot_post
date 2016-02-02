var env = require('node-env-file');
env(__dirname + '/.env');

var Slack = require('slack-node');

webhookUri = process.env.SLACK_WEB_HOOK_URL;

slack = new Slack();
slack.setWebhook(webhookUri);

var Moment = require('moment');
var moment = Moment();
var filename = moment.format('YYYYMMDD.png');

slack.webhook({
  channel: process.env.SLACK_CHANNEL,
  username: "nodejs",
  text: "http://" + process.env.HOST_NAME + "/" + filename
}, function(err, response) {
  console.log(response);
});
