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
      output.change = cashReverter(output.change);
      break;
    } else if (change < .01){
      output.status = "OPEN"
      output.change = cashReverter(output.change);
      break;
    } else if (i < 0) {
      output.status = "INSUFFICIENT_FUNDS"
      output.change = [];
      break;
    }
     debugger;
  }

  // Here is your change, ma'am.
  return output;
}

function cashReverter(arr) {
	  debugger;
      return arr.reduce(function (allNames, name) {
      if (name in allNames) {
        allNames[name]++;
      }
      else {
        allNames[name] = 1;
      }
      return allNames;
    }, {});
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

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

// Need to add the CID functionality
// Main functionality is done. Gives Money
// Might be a better way to write my code with only arrays

function checkCashRegister(price, cash, cid) {
  let change = ((cash * 100) - (price * 100)).toFixed();
  let output = {status: null, change: []};
  let cashObj = cashConverter();

  cid.forEach(currency => {
    cashObj[currency[0]]["amount"] = ((currency[1] * 100) / cashObj[currency[0]]["value"]).toFixed();
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
      change -= cashObj[curr].value;
    } else if (change >= cashObj[curr].value && change <= max && cashObj[curr].amount <= 0){
      i -= 1;
    } else if (change >= cashObj[curr].value){
      max = cashObj[curr].value;
      i += 1;
    } else if (change <= cashObj[curr].value) {
      max = cashObj[curr].value;
      i -= 1;
    }

    if (change <= 0 && cashObj[curr].amount <= 0) {
      output.status = "CLOSED";
      break;
    } else if (change <= 0){
      output.status = "OPEN"
      break;
    } else if (i < 0) {
      output.status = "INSUFFICIENT_FUNDS"
      break;
    }
    debugger;
  }

  // Here is your change, ma'am.
  return output;
}

function cashConverter() {
  return {
    "PENNY": {value: 1, amount: null},
    "NICKEL": {value: 5, amount: null},
    "DIME": {value: 10, amount: null},
    "QUARTER": {value: 25, amount: null},
    "ONE": {value: 100, amount: null},
    "FIVE": {value: 500, amount: null},
    "TEN": {value: 1000, amount: null},
    "TWENTY": {value: 2000, amount: null},
    "ONE HUNDRED": {value: 10000, amount: null}
  };
}

console.log(checkCashRegister(19.71, 20, [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log((2.05/0.05).toPrecision(4));





//Broke the code somewhere
//First Commit
//-------------//
// function checkCashRegister(price, cash, cid) {
//   let change = (cash * 100) - (price * 100);
//   let output = {status: null, change: change};
//   let cashObj = cashConverter();
//
//    cid.forEach(currency => {
//     // console.log(cashObj[currency[0]]["value"])
//     cashObj[currency[0]]["amount"] = ((currency[1] * 100) / cashObj[currency[0]]["value"]).toFixed();
//     console.log(currency[0], "Value:", cashObj[currency[0]]["value"], "Amount:", cashObj[currency[0]]["amount"])
//     });
//
//    let max = null;
//   let current = null;
//   let tempHolder = [];
//
//    let i = 0;
//   while (i < cid.length){
//     let curr = cid[i][0];
//     if (current === null){
//       current = cashObj[curr].value;
//       max = cashObj[curr].value;
//     }
//
//      if (change >= cashObj[curr].value && change <= max){
//       tempHolder.push(curr);
//       cashObj[curr].amount--;
//       change -= cashObj[curr].value;
//     } else if (change >= cashObj[curr].value){
//       max = cashObj[curr].value;
//       i += 1;
//     } else if (change <= cashObj[curr].value) {
//       max = cashObj[curr].value;
//       i -= 1;
//     }
//
//      if (change <= 0){
//       break;
//     }
//     debugger;
//   }
//
//    // for (let currency in cashObj) {
//   //   if(change > cashObj[currency].value){
//   //     tempHolder[currency] = cashObj[currency];
//   //     console.log(currency)
//   //   } else {
//   //     break;
//   //   }
//   // }
//
//    // Here is your change, ma'am.
//   return tempHolder;
// }
//
//  // console.log(currency[0], cashObj[currency[0]]["amount"])
//
//  function cashConverter() {
//   return {
//     "PENNY": {value: 1, amount: null},
//     "NICKEL": {value: 5, amount: null},
//     "DIME": {value: 10, amount: null},
//     "QUARTER": {value: 25, amount: null},
//     "ONE": {value: 100, amount: null},
//     "FIVE": {value: 500, amount: null},
//     "TEN": {value: 1000, amount: null},
//     "TWENTY": {value: 2000, amount: null},
//     "ONE HUNDRED": {value: 10000, amount: null}
//   };
// }
//
//
//  // Example cash-in-drawer array:
// // [["PENNY", 1.01],
// // ["NICKEL", 2.05],
// // ["DIME", 3.1],
// // ["QUARTER", 4.25],
// // ["ONE", 90],
// // ["FIVE", 55],
// // ["TEN", 20],
// // ["TWENTY", 60],
// // ["ONE HUNDRED", 100]]
//
//  console.log(checkCashRegister(19.84, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// console.log((2.05/0.05).toPrecision(4));















//lastest code. before I found out the float errors.
// avoiding git branching for now.

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

// Need to add the CID functionality
// Main functionality is done. Gives Money
// Might be a better way to write my code with only arrays
//
// function checkCashRegister(price, cash, cid) {
//   let change = (cash * 100) - (price * 100);
//   let output = {status: null, change: []};
//   let cashObj = cashConverter();
//
//   cid.forEach(currency => {
//     cashObj[currency[0]]["amount"] = ((currency[1] * 100) / cashObj[currency[0]]["value"]).toFixed();
//     console.log(currency[0], "Value:", cashObj[currency[0]]["value"], "Amount:", cashObj[currency[0]]["amount"])
//     });
//
//   let max = null;
//
//   let i = 0;
//   while (i < cid.length){
//     let curr = cid[i][0];
//     if (max === null){
//       max = cashObj[curr].value;
//     }
//
//     if (change >= cashObj[curr].value && change <= max && cashObj[curr].amount > 0){
//       output.change.push(curr);
//       cashObj[curr].amount--;
//       change -= cashObj[curr].value;
//     } else if (change >= cashObj[curr].value && change <= max && cashObj[curr].amount <= 0){
//       i -= 1;
//     } else if (change >= cashObj[curr].value){
//       max = cashObj[curr].value;
//       i += 1;
//     } else if (change <= cashObj[curr].value) {
//       max = cashObj[curr].value;
//       i -= 1;
//     }
//
//     if (change <= 0 && cashObj[curr].amount <= 0) {
//       output.status = "CLOSED";
//       output.change = cashReverter(output.change);
//       break;
//     } else if (change <= 0){
//       output.status = "OPEN"
//       output.change = cashReverter(output.change);
//       break;
//     } else if (i < 0) {
//       output.status = "INSUFFICIENT_FUNDS"
//       output.change = [];
//       break;
//     }
//     debugger;
//   }
//
//   // Here is your change, ma'am.
//   return output;
// }
//
// function cashReverter(arr) {
//       return arr.reduce(function (allNames, name) {
//       if (name in allNames) {
//         allNames[name]++;
//       }
//       else {
//         allNames[name] = 1;
//       }
//       return allNames;
//     }, {});
// }
//
// function cashConverter() {
//   return {
//     "PENNY": {value: 1, amount: null},
//     "NICKEL": {value: 5, amount: null},
//     "DIME": {value: 10, amount: null},
//     "QUARTER": {value: 25, amount: null},
//     "ONE": {value: 100, amount: null},
//     "FIVE": {value: 500, amount: null},
//     "TEN": {value: 1000, amount: null},
//     "TWENTY": {value: 2000, amount: null},
//     "ONE HUNDRED": {value: 10000, amount: null}
//   };
// }
//
// console.log(checkCashRegister(19.71, 20, [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
// console.log((2.05/0.05).toPrecision(4));
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
