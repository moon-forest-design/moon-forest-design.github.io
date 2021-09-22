'use strict';

for (let i = 0; i < 5; i++) {
  const root = document.getElementById('root');
  const div = document.createElement('div');
  div.onclick = function() {
    console.log(`This is box # ${i}`);
  }
  root.appendChild(div);
}
