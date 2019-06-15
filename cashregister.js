// let changeObj = {DIME: 2, FIVE: 3, ONE: 1, PENNY: 4, QUARTER: 2, TEN: 2, TWENTY:3};
// let arrChange = Object.entries(changeObj);
// let cashConvertObj = cashConverter();
// arrChange.sort((a, b) => cashConvertObj[a[0]].value - cashConvertObj[b[0]].value)

// This one is the most closest yet. My cid for each was the one making the mistakes and the js float errors.
// All I need now is the correct change format.
function checkCashRegister(price, cash, cid) {
  let change = (cash - price).toFixed(2);
  let output = {status: null, change: []};
  let cashObj = cashConverter();

  cid.forEach(currency => {
    cashObj[currency[0]]["amount"] = (currency[1] / cashObj[currency[0]]["value"]).toFixed();
    console.log(currency[0], "Value:", cashObj[currency[0]]["value"], "Amount:", cashObj[currency[0]]["amount"])
    });

  let max = null;

  let i = 0;
  while (i < cid.length){
    let curr = cid[i][0];
    if (max === null){
      max = cashObj[curr].value;
    }

    if (change >= cashObj[curr].value && change <= max && cashObj[curr].amount > 0){
      output.change.push(curr);
      cashObj[curr].amount--;
      change = (change - cashObj[curr].value).toFixed(2);
    } else if (change >= cashObj[curr].value && change <= max && cashObj[curr].amount <= 0){
      i -= 1;
    } else if (change >= cashObj[curr].value){
      max = cashObj[curr].value;
      i += 1;
    } else if (change <= cashObj[curr].value) {
      max = cashObj[curr].value;
      i -= 1;
    }

    if (change < .01 && cashObj[curr].amount <= 0) {
      output.status = "CLOSED";
      output.change = cid;
      break;
    } else if (change < .01){
      output.status = "OPEN"
      output.change = objtoArrformat(cashReverter(output.change));
      break;
    } else if (i < 0) {
      output.status = "INSUFFICIENT_FUNDS"
      output.change = [];
      break;
    }
     //debugger;
  }

  // Here is your change, ma'am.
  return output;
}

function cashReverter(arr) {
	let cashConvertObj = cashConverter();
  let reduced = arr.reduce(function (allNames, name) {
      if (name in allNames) {
        allNames[name]++;
      }
      else {
        allNames[name] = 1;
      }
      return allNames;
    }, {});
	for(let currency in reduced){
		reduced[currency] = reduced[currency] * cashConvertObj[currency].value;
	}
	return reduced;
}

function objtoArrformat(obj) {
	let arrChange = Object.entries(obj);
	let cashConvertObj = cashConverter();
 	return arrChange.sort((a, b) => cashConvertObj[b[0]].value - cashConvertObj[a[0]].value);
}

function cashConverter() {
  return {
    "PENNY": {value: .01, amount: null},
    "NICKEL": {value: .05, amount: null},
    "DIME": {value: .10, amount: null},
    "QUARTER": {value: .25, amount: null},
    "ONE": {value: 1, amount: null},
    "FIVE": {value: 5, amount: null},
    "TEN": {value: 10, amount: null},
    "TWENTY": {value: 20, amount: null},
    "ONE HUNDRED": {value: 100, amount: null}
  };
}
