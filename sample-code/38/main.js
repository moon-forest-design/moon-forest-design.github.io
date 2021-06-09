{ // ブロックスコープ(START)
"use strict";

// jQueryを使うよ
$(function() {
  // カルーセルスライダー「slick」を使うよ！
  $('.slider').slick({
    autoplay: true, // 自動再生するか？
    autoplaySpeed: 3000, // 自動再生時の間隔ms
    speed: 1000, // 画像が切り替わる速度
    pauseOnHover: false, // 画像にマウスオーバしたときに停止するか？
  });
});


} // ブロックスコープ(END)
