{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // ふわっと表示（ScrollReveal.js）を使うよ
  ScrollReveal().reveal('.content', { 
    duration: 2000, // アニメーションの開始から終了までの時間
    viewFactor: 0.3, // どれくらい見えたら実行するか指定（値：0～1）
    distance: '100px', // 下から移動表示する場合の長さ
    // reset: true, // 処理を繰り返すか？
  });

});


} // ブロックスコープ(END)
