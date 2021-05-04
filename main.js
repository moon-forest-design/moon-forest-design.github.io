{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {

  // サンプルの説明を表示する
  $('.cardThumbnail').hover(function() {
    $('.cardThumbnail__description', this).animate({
      top: "0",
    }, 500);
  }, function() {
		$('.cardThumbnail__description', this).animate({
      top: "189px",
    }, 500);
  });

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

  // スムーズスクロール
  $('a[href^="#"]').click(function() {
    const $href = $(this).attr("href"); // a要素のhref属性の中身を取得
    const $adjust = $href === "#" || $($href).hasClass("visible") ? 0 : 100; // 位置をtranslateによって移動させているので調整しないとズレる
    const $target = $($href === "#" || $href === "" ? "html" : $href); // トップへ戻る場合は"html"を代入。他はaリンクのhrefの中身を代入。
    const $position = $target.offset().top - $adjust; // 移動先の要素のtop位置を取得　$adjustで調整
    $('body, html').animate({
      scrollTop: $position
    }, 500, 'swing'); // スピード500、動作"swing"
    return false;
  });


});


} // ブロックスコープ(END)
