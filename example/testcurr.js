
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
for(let mm of m) {
    let c2 = mm.Chinese();
    console.log(mm.isErr,mm.value, mm.format(true, true), c2, mm.errMsg);
}
