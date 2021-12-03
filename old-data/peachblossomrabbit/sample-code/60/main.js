{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // ドロワーメニュー
  $('.burgerBox, .mask').on('click', function() {
    $('.burgerBtn').toggleClass('open');
    $('.navList').toggleClass('open');
    $('.mask').toggleClass('open');

  });
  $('.navList__link').on('click', function() {
    $('.burgerBtn').removeClass('open');
    $('.navList').removeClass('open');
    $('.mask').removeClass('open');
  });

  // スムーズスクロール
  $('a[href^="#"]').click(function() { // a要素（href属性の値に#が付いているもの）をクリックしたら実行
    const headerHeight = 100; // headerの高さ
    const $href = $(this).attr("href"); // a要素のhref属性の中身を取得
    const $adjust = $href === "#" ? 0 : headerHeight + 10 ; // 移動先がピッタリにならないよう調整する　トップ以外は上に 10px余白
    const $target = $($href === "#" || $href === "" ? "html" : $href); // トップへ戻る場合は"html"を代入　他はaリンクのhrefの中身を代入
    const $position = $target.offset().top - $adjust; // 移動先の要素のtop位置を取得　及び$adjustで調整
    $('body, html').animate({
      scrollTop: $position
    }, 500, 'swing'); // animate()を使ってスムーズにページ内移動　スピード500、動作swing
    return false;
  });

});


} // ブロックスコープ(END)
