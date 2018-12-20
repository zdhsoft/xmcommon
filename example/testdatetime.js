let {datetimeUtils}= require("../lib/datetimeUtils");

let v = datetimeUtils.DateTimeStringToUTC("2018-12-12 23:00:19.123");
let vv = datetimeUtils.dateStringByUTC(v)
let datenow = datetimeUtils.getNow();
let datenowutc = datetimeUtils.getUTCNow();
let datesecondnow = datetimeUtils.getNowSecond();
let datesecondutcnow = datetimeUtils.getUTCNowSecond();

console.log('version:'+datetimeUtils.version());
console.log("toLocaleString:",new Date(v).toLocaleString());
console.log("dateStringByUTC:", vv);
console.log("dateStringByMillis:", datetimeUtils.dateStringByMillis(datetimeUtils.ToLocalTime(v)));
console.log(datenow, datenowutc, datenow - datenowutc);
console.log(datesecondnow, datesecondutcnow, datesecondnow - datesecondutcnow);
console.log(datetimeUtils.dateStringByUTC(datetimeUtils.getTodayZeroTime(datenowutc)));

let a = new Date();
console.log(a.getTime(), Date.now());
