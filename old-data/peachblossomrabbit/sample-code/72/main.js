"use strict";

function add(num1) {
  return function(num2){
    return num1 + num2;
  }
}
const result = add(1)(2);
console.log(result);