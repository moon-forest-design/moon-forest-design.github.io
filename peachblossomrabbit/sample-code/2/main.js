{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // スクロールされないとき メッセージ「Please Scroll」を表示
  setTimeout(function() { // 3秒待つ
    if ($(window).scrollTop() < 10) { // 3秒経っても上端から10px以上スクロールしない場合
      $("#pleaseScroll").fadeIn(); // 「Please Scroll」を表示しスクロールを促す
    }
  }, 3000);

  // スクロールされたら「Please Scroll」を非表示
  $(window).scroll(function() {
    $("#pleaseScroll").fadeOut();
  });

});


} // ブロックスコープ(END)
