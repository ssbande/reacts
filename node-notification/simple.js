const notifier = require('node-notifier');

// String
console.log('Simple notifications default ...')
notifier.notify('Go empty the dishwasher!');

// Object
console.log('Simple notifications custom ...')
notifier.notify({
  'title': 'SB App',
  'subtitle': 'Daily notice',
  'message': 'Go approve comments in moderation!',
  'sound': 'ding.mp3',
  'wait': false,
  'icon': 't.png',
  'appID': '-- sb --',
  'contentImage': 't.png'
});