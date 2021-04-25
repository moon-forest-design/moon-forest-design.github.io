{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // コンテンツの近くにスクロールされたら　ふんわり表示する
  $(window).scroll(function() {
    const $winHeight = $(window).height(); // ウィンドウ画面の高さを取得

    $(".contents, .content").each(function() {
      const $scrollTop = $(window).scrollTop(); // スクロールした現在のtopの位置を取得
      const $scrollBottom = $scrollTop + $winHeight; // スクロールした現在のtopの位置にウィンドウ画面の高さを加算してbottomの位置を算出
      const $offsetTop = $(this).offset().top; // コンテンツの位置を取得

      // ふんわり表示させたいコンテンツにスクロールが及べば表示する
      if ( $scrollBottom > $offsetTop) {
        $(this).addClass("visible");
      }

    });
  });

});


} // ブロックスコープ(END)
