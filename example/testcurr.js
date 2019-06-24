
let {CNYCurrency} = require('../lib/cnycurrency');

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

let ccc = new CNYCurrency();
let y = new CNYCurrency(null);

m.push(ccc);

for(let mm of m) {
    console.log(mm.value, mm.intValue, mm.toString(), mm.format(true, true), mm.Chinese());
}

for(let i = 0; i < 100000000; i++) {
    ccc.intValue = i;
    let y = ccc.yuan;
    let c = ccc.cent;
    let s = y.toString() + '.' + c.toString().padStart(2, '0');
    if (i % 1000 === 0) {
        console.log(i);
    }
    if(s !== ccc.toString()) {
        console.log(console.log(ccc.toString(), s, ccc.yuan, ccc.cent));
    }

}
console.log('finish');
