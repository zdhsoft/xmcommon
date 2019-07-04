
let {CNYCurrency} = require('../lib/cnycurrency');
let {datetimeUtils} = require('../lib/datetimeUtils');

let m = [];
let c = new CNYCurrency(-12345);
m.push(c);
m.push(c.add(109999));
m.push(c.sub(10));
m.push(c.div(0.01));
m.push(c.mul(10));
m.push(c.mul(0.01));

let tt = new CNYCurrency(0);
tt.selfAdd(2805307.04);
tt.selfAdd(4323515.28);
tt.selfAdd(2805307.04);
tt.selfAdd(3281107.13);
m.push(tt);
m.push(tt.div(100));


let ccc = new CNYCurrency();
m.push(ccc);
m.push(new CNYCurrency(123456789.00));
m.push(new CNYCurrency(12000.12));
m.push(new CNYCurrency(10000020.10));
m.push(new CNYCurrency(10020.01));
m.push(new CNYCurrency(12000.01));
m.push(new CNYCurrency(1409.50));
m.push(new CNYCurrency(19.50));
m.push(new CNYCurrency(6007.14));
m.push(new CNYCurrency(16409.02));
m.push(new CNYCurrency(325.04));

function fff(v) {
    m.push(new CNYCurrency(v));
}
fff(0.05);
let jjj = new CNYCurrency(0.1);
jjj.Chinese();

fff(1.20);
fff(1.23);
fff(20.56);
fff(15.00);
fff('56.08');
fff(200.11);
fff(205.12);
fff(5001.09);
fff(67004.00);
fff(200080.07);
fff(0.2);
fff(0.15);
fff(5252501.90);
m = [];
let d = new Date('2019-6-28');
let d2 = new Date('2020-6-16');
let v = datetimeUtils.diffLocalDaysByDate(d2, d);
let o = 5504180.56;
let vv = 0.0465 * v / 360;

console.log('天数:' + v, '最终费率：' + vv);

let diff = o * vv;
fff(diff);
fff(o - diff);
console.log(o - diff);
console.log((o - diff).toFixed(2));

let cccc = new CNYCurrency(5504180.56);
let cdiff = cccc.mul(vv);
cccc.selfSub(cdiff.value);
m.push(cccc);
m.push(cdiff);


for(let mm of m) {
    let c2 = mm.Chinese();
    console.log(mm.isErr, mm.value.toFixed(2).padStart(20, ' '), mm.format(true, false).padStart(20,' '), c2, mm.errMsg);
}
