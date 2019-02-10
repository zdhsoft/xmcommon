console.log("aaaaa");


	/**
	 * 获取竞猜最终的价格区间,返回[minPrice, maxPrice]
	 * @param {number} paramQuizPrice
	 * @param {number} paramFloatInterval
	 * @return {[number,number]}  [min,max]
	 */
	function getPriceInterval(paramQuizPrice, paramFloatInterval) {
		//最小值为：物品参考价*(1-折扣)
		//最大值为：物品参考价*(1+折扣)

		let r = [];
		do {
			// if(!utils.isNumber(paramQuizPrice)) {
			// 	paramQuizPrice = 0;
			// }
			// if(!utils.isInteger(paramFloatInterval)) {
			// 	paramFloatInterval = 0;
			// }

			if(paramFloatInterval < 0) {
				paramFloatInterval = 0;
			}

			let maxFloat = (100.0 + paramFloatInterval)/100;
			let minFloat = (100 - paramFloatInterval)/100;

			if(minFloat <0) {
				minFloat = 0;
			}

			const c = (q,f) => {
				return  Math.floor(q * f * 100)/100;
			};
			r.push(c(paramQuizPrice, minFloat));
			r.push(c(paramQuizPrice, maxFloat));
		}while(false);
		return r;
	}

	function randPrice(paramQuizPrice, paramFloatInterval, paramDight) {
		let [minP, maxP] = getPriceInterval(paramQuizPrice, paramFloatInterval);
		let minN = Math.floor(minP * 100);
		let maxN = Math.floor(maxP * 100);
		let v = (Math.floor(Math.random() * (maxN - minN)) + minN)/100;
		let m = "";//maxP.toFixed(paramDight);
		let curr = "";// v.toFixed(paramDight);

		if(paramDight === 0) {
			m = String(Math.floor(maxP));
			curr = String(Math.floor(v));
		}
		else {
			m = maxP.toFixed(paramDight);
			curr = v.toFixed(paramDight);
		}


		let cnt = m.length - curr.length;
		if(cnt > 0) {
			let p = [];
			for(let i = 0; i < cnt; i++) {
				p.push('0');
			}
			p.push(curr);
			curr = p.join('');
		}
		return curr;
	}

	let d1 = Date.now();
	let s = new Set();
	for(let i = 0; i < 100; i++) {
		s.add(randPrice(1000,20,0));
	}

	let hasCnt = 0;
	let notHas = 0;
	for(let i = 0; i < 1000; i++) {
		let v = randPrice(1000,20,0);
		if(s.has(v)) {
			hasCnt ++;
		}
		else {
			notHas ++;
		}
	}
	let d2 = Date.now() - d1;
	for(let k of s.values()) {
		console.log(k);
	}
	console.log("hasCnt=" + hasCnt + ",notHas=" + notHas + ",deta=" + d2);

	// let ccc = [1,10,100,1000,10000,100000];
	// function GetModulus(paramDight) {
	// 	return ccc[paramDight] || 1;
	// }

	// for(let i = 0; i < 10; i++) {
	// 	//console.log(GetModulus(i));
	// }

	// let idcnt = 0;// Math.floor(Math.random() * 1000000);
	// function CreateUUID_UserId() {
	// 	//return Constant.MEMBER_ID + this.GetUUID();
	// 	return Math.floor(Date.now()/1000) + "_" + idcnt++;
	// }

	// for(let i = 0; i < 20; i++) {
	// 	console.log(CreateUUID_UserId());
	// }
