{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // トップへ戻るを表示・非表示する
  $(window).scroll(function() {
    const $winHeight = $(this).height(); // ウィンドウ画面の高さを取得
    const $scrollTop = $(this).scrollTop(); // スクロールした現在のtopの位置を取得
    const $scrollBottom = $scrollTop + $winHeight; // スクロールした現在のtopの位置にウィンドウ画面の高さを加算してbottomの位置を算出
    const $borderLine = $(document).height() * 0.7; // ページの高さの7割くらいを基準線にする 
    if ( $scrollBottom > $borderLine ) {
      $("#backToTopBtn").fadeIn(); // スクロールして基準線を超えたらトップへ戻るを表示
    } else {
      $("#backToTopBtn").hide(); // スクロールが基準線に達しない場合はトップへ戻るを非表示
    }
  });

});


} // ブロックスコープ(END)
