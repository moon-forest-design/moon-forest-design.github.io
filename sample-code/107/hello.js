"use strict";

// named export
export function sayHello(str) {
  // HTMLファイルへ表示
  const root = document.getElementById("root");
  const p = document.createElement('p');
  const text = document.createTextNode(`Hello ${str} !`);
  root.appendChild(p).appendChild(text);

  // コンソールにも表示
  console.log(`Hello ${str} !`);

}
