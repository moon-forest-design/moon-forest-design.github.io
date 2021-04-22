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

  // ページ底部の上端を境にトップへ戻るの表示非表示
  const backToTop = () => {
    const $docHeight = $(document).height(); // ページ全体の高さ
    const $winHeight = $(window).height(); // 表示領域の高さ
    const $bottomPage = $docHeight - $winHeight - 20; // ページ全体の高さから表示領域の高さを引いて底部ページの上端を算出　調整20
    if ( $(this).scrollTop() > $bottomPage ) {
      $("#backToTopBtn").fadeIn(); // ページ底部の上端までスクロールされたらトップへ戻るを表示
    } else {
      $("#backToTopBtn").hide(); // ページ底部の上端までスクロールが達していない場合はトップへ戻るを非表示
    }
  };

  // スクロールされたときのイベントハンドラ
  $(window).scroll(function() {
    backToTop(); // ページ底部の上端を境にトップへ戻るの表示非表示
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
