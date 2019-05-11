//"FreeCodeCamp"
// My solution


function rot13(str) { // LBH QVQ VG!
  let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  let newStr = "";
  for(let i = 0; i < str.length; i++){
    let val = arr.indexOf(str[i]);
    let place = val + 13;
    //console.log(str[i], val);
    if (place > 25){
      place = place - 26;
    }
    if (val !== -1){
      newStr += arr[place];
    } else {
      newStr += str[i];
    }

  }


  return newStr;
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));
console.log("hi");
console.log(rot13("N"));
