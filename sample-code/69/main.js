'use strict';

for (let i = 0; i < 5; i++) {
  const demo = document.getElementById('demo');
  const div = document.createElement('div');
  div.onclick = function() {
    console.log(`This is box # ${i}`);
  }
  demo.appendChild(div);
}
