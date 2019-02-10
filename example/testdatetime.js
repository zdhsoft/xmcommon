let {datetimeUtils}= require("../lib/datetimeUtils");
let {utils} = require("../lib/utils");

let u1 = datetimeUtils.getUTCNow();
let l1 = datetimeUtils.getLocalNow();
let u2 = datetimeUtils.getUTCNowSecond();
let l2 = datetimeUtils.getLocalNowSecond();
let u3 = u1 + 86400000 * 5;

let d1 = new Date();
let d2 = new Date("2019-2-13 0:0:0");

console.log(datetimeUtils.getTimeZoneMinute(), datetimeUtils.getTimeZoneSecond(), datetimeUtils.getTimeZoneMillis());
console.log(u1, l1, l1 - u1);
console.log(u2, l2, l2 - u2);
console.log(datetimeUtils.diffLocalDays(u3,u1));
console.log(datetimeUtils.diffLocalDays(d2.getTime(),d1.getTime()));

// let v = datetimeUtils.DateTimeStringToUTC("2018-12-12 23:00:19.123");
// let vv = datetimeUtils.dateStringByUTC(v)
// let datenow = datetimeUtils.getNow();
// let datenowutc = datetimeUtils.getUTCNow();
// let datesecondnow = datetimeUtils.getNowSecond();
// let datesecondutcnow = datetimeUtils.getUTCNowSecond();

// console.log('version:'+datetimeUtils.version());
// console.log("toLocaleString:",new Date(v).toLocaleString());
// console.log("dateStringByUTC:", vv);
// console.log("dateStringByMillis:", datetimeUtils.dateStringByMillis(datetimeUtils.ToLocalTime(v)));
// console.log(datenow, datenowutc, datenow - datenowutc);
// console.log(datesecondnow, datesecondutcnow, datesecondnow - datesecondutcnow);
// console.log(datetimeUtils.dateStringByUTC(datetimeUtils.getTodayZeroTime(datenowutc)));

// console.log(utils.isNotNullOrEmptyString(""));
// console.log(utils.isNotNullOrEmptyString(null));
// console.log(utils.isNotNullOrEmptyString(undefined));
// console.log(utils.isNotNullOrEmptyString("aaaa"));
// console.log(utils.isNotNullOrEmptyString(123));

// function randomPrice(paramPrice, paramFloatInterval, paramDights) {
// 	let deta =  Math.random() * (paramFloatInterval * 2);
// 	let r = paramPrice * (100 - paramFloatInterval + deta)/100;
// 	return Number.parseFloat(r.toFixed(paramDights));
// }
// let v = [];
// let max = 2;
// for(let i = 0; i < max; i++) {
// 	v[i] = 0;
// }

// function randomInteger(paramMaxInteger) {
// 	return Math.floor(Math.random() * paramMaxInteger);
// }


// let price = 5.00;
// let interval = 20;
// let dights = 4;
// for(let i = 0; i < 100000; i++) {
// 	//console.log(randomPrice(price, interval, dights));
// 	v[randomInteger(max)]++;
// }

// for(let i = 0; i < max; i++) {
// 	console.log(`v[${i}]=${v[i]}`);
// 	//v[i] = 0;
// }

// //let a = new Date();
// //console.log(a.getTime(), Date.now());
