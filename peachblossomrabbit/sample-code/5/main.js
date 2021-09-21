{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // トップへ戻るボタンを表示・非表示する
  $(window).scroll(function() {
    const $winHeight = $(this).height(); // ウィンドウ画面の高さを取得
    const $scrollTop = $(this).scrollTop(); // スクロールした現在のtopの位置を取得
    const $scrollBottom = $scrollTop + $winHeight; // スクロールした現在のtopの位置にウィンドウ画面の高さを加算してbottomの位置を算出
    const $borderLine = $(document).height() * 0.7; // ページ全体の高さの7割くらいを基準線にする 
    if ( $scrollBottom > $borderLine ) {
      $("#backToTopBtn").fadeIn(); // スクロールして基準線を超えたらトップへ戻るボタンを表示
    } else {
      $("#backToTopBtn").fadeOut(); // スクロールが基準線に達しない場合はトップへ戻るボタンを非表示
    }
  });

});


} // ブロックスコープ(END)
