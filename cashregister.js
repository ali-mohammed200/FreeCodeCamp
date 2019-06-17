// let changeObj = {DIME: 2, FIVE: 3, ONE: 1, PENNY: 4, QUARTER: 2, TEN: 2, TWENTY:3};
// let arrChange = Object.entries(changeObj);
// let cashConvertObj = cashConverter();
// arrChange.sort((a, b) => cashConvertObj[a[0]].value - cashConvertObj[b[0]].value)

// This one is the most closest yet. My cid for each was the one making the mistakes and the js float errors.
// All I need now is the correct change format.
function checkCashRegister(price, cash, cid) {
  let change = (cash - price).toFixed(2);
  // Calculating change and limiting it to two decimal places.
  let output = {status: null, change: []};
  let cashObj = cashConverter();  // Returns an Object which holds money ex: "PENNY": {value: .01, amount: null}

  //cid is a 2D array  ex: [["PENNY", 1.01], ["NICKEL", 2.05]]
  cid.forEach(currency => {
    cashObj[currency[0]]["amount"] = (currency[1] / cashObj[currency[0]]["value"]).toFixed();
    console.log(currency[0], "Value:", cashObj[currency[0]]["value"], "Amount:", cashObj[currency[0]]["amount"])
    });
  // For each element in the array, we are filling the cashObj with the amount of each currency.
  // Ex: "PENNY": {value: .01, amount: 3}

  let max = null;
  let i = 0;

  //We will transverse through the CID array and grab our change
  while (i < cid.length){
    let curr = cid[i][0]; // [["PENNY", 1.01]] -> "PENNY"
    // Always starts at the smallest value in the drawer
    if (max === null){
      max = cashObj[curr].value; // {"PENNY": {value: .01, amount: null}} -> 0.01
    }

    if (change >= cashObj[curr].value && change <= max && cashObj[curr].amount > 0){
      // if change is greater than or equal to the current value and less than or equal to the max
      // and current amount bill count is greater than zero
      // i is not incremented or decremented. We stay on that bill.
      output.change.push(curr); // ["QUARTER", "PENNY", "PENNY"]
      cashObj[curr].amount--; // Reduce the bill amount
      change = (change - cashObj[curr].value).toFixed(2); // Calculate the new change amount and limiting the float value
    } else if (change >= cashObj[curr].value && change <= max && cashObj[curr].amount <= 0){
      // if change is greater than or equal to the current value and less than or equal to the max
      // and current amount bill count is less than or equal to zero
      // i is decremented and the smaller bill becomes the current while the max stays the same
      i -= 1;
    } else if (change >= cashObj[curr].value){
      // if change is greater than the current value,
      // the current becomes the max until curr is greater than or equal to change.
      // i is incremented and the next bill is brought
      max = cashObj[curr].value;
      i += 1;
    } else if (change <= cashObj[curr].value) {
      // The max value is adjusted the the change amount changes.
      max = cashObj[curr].value;
      i -= 1;
    }

    // < 0.01 for js float errors
    if (change < .01 && cashObj[curr].amount <= 0) {
      output.status = "CLOSED";
      output.change = cid;
      break;
    } else if (change < .01){
      output.status = "OPEN"
      output.change = objtoArrformat(cashReverter(output.change)); // {NICKEL:3, PENNY : 5} -> [[NICKEL, 3], [PENNY, 5]]
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
  // [PENNY, PENNY, PENNY] -> {PENNY: 3} -> {PENNY: 0.03}
	let cashConvertObj = cashConverter(); // Produce an instance of cashConverter Object to be able to work without scope limitations
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
  // {PENNY: 0.03, NICKEL: 0.60} -> [[PENNY, 0.03], [NICKEL, 0.60]]
	let arrChange = Object.entries(obj); // We could have used a for in loop which would be substantially faster
  // see this -> https://hackernoon.com/5-techniques-to-iterate-over-javascript-object-entries-and-their-performance-6602dcb708a8
	let cashConvertObj = cashConverter(); // Produce an instance of cashConverter Object
  // Sorted from big to small
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
