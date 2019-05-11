//"FreeCodeCamp"
// My solution

/*
 ciphershifter is a function that allows you
 to specify a number and it will build an object of letters based on the shift number.
 In general caesars ciphers was a shift in 13 to the right.
 Now you can shift in any amount up to the letters of the alphabet.
 Switching to mod operator allows to add any number greater than 26 to shift.
 I wanted to be able to write my rot13
 function with the ability to specify a shift amount. Function only works for capitals.

 Below the cipher shifter function is the rot13 function with only the capability to shift by 13.
 */
function ciphershifter(num){
  let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  let shiftObj = arr.reduce(function(acc, curr, i){
    let place = i + num;
    if(place > 25){
      place = place % 26;
    }
    // console.log(curr, i, num, place)
    acc[curr] = arr[place]
    return acc;
  }, {})

  return shiftObj;
}
// console.log(ciphershifter(13)["A"]);
// function rot13(str) { // LBH QVQ VG!
//   let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
//   let newStr = "";
//   for(let i = 0; i < str.length; i++){
//     let val = arr.indexOf(str[i]);
//     let place = val + 13;
//     //console.log(str[i], val);
//     if (place > 25){
//       place = place - 26;
//     }
//     if (val !== -1){
//       newStr += arr[place];
//     } else {
//       newStr += str[i];
//     }

//   }


//   return newStr;
// }

function rot13(str){
  return str.split("").map((letter) => ciphershifter(13)[letter]? ciphershifter(13)[letter] : letter).join("");
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC")); // "FREE CODE CAMP"
console.log("hi"); // "hi"
console.log(rot13("N")); // "A"
