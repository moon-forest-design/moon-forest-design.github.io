'use strict';

var createCounter = function () {
  var cnt = 0;
  return function () {
    cnt += 1;
    console.log(cnt);
  };
};
var counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3
