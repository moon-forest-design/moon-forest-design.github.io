"use strict";

// default export
export default function(str) {
  // HTMLファイルへ表示
  const root = document.getElementById("root");
  const p = document.createElement('p');
  const text = document.createTextNode(`Good Luck ${str} !`);
  root.appendChild(p).appendChild(text);

  // コンソールにも表示
  console.log(`Good Luck ${str} !`);

}
