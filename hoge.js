const moment = require('moment-timezone');

console.log(moment().tz('Asia/Tokyo').format('H'));

console.log(moment().format('H'));

// let hour = new Date(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })).getHours();

// // console.log(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }).getHours());

// hour += 25;
// // if (process.env.HEROKU_URL) {
// // }

// console.log(hour);

// console.log(new Date(Date.now() + ((new Date().getTimezoneOffset() ) * 60 * 1000)))
