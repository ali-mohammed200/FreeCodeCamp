function telephoneCheck(str) {
  let val = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
  return val.test(str);


}

console.log(telephoneCheck("555-555-5555"));


  // let val2 = /1\D?(\d{3})\D(\d{3})\D(\d{4})/;
  // let val = /(\d{3})\D(\d{3})\D(\d{4})/;
  // return val2.test(str) && val.test(str);
