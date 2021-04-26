{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // コンテンツのふんわり表示：コンテンツの近くにスクロールされたら、ふんわり表示する
  $(window).scroll(function() {
    const $winHeight = $(window).height(); // ウィンドウ画面の高さを取得
    $(".contents, .content").each(function() {
      const $scrollTop = $(window).scrollTop(); // スクロールした現在のtopの位置を取得
      const $scrollBottom = $scrollTop + $winHeight; // スクロールした現在のtopの位置にウィンドウ画面の高さを加算してbottomの位置を算出
      const $offsetTop = $(this).offset().top; // コンテンツの位置を取得
      if ( $scrollBottom > $offsetTop) { // ふんわり表示させたいコンテンツにスクロールが及べば表示する
        $(this).addClass("visible");
      }
    });
  });


  // コンテンツのふんわり表示：中途半端な位置でリロードされたときも、ふんわり表示する
  $(window).load(function(){
    $(".contents, .content").each(function() {
      $(this).addClass("visible");
    });
  });


});


} // ブロックスコープ(END)
