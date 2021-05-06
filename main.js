{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // justify-content: between;の最後の行を左寄せにする
  const $aId = ["#sampleCode", "#sampleSite"]; // 左寄せにしたい親要素のIDを入力しておく
  for (let $i = 0; $i < $aId.length; $i++) { // 
    const $cellWidth = $(`${$aId[$i]} .card`).outerWidth(true); // 子要素の幅を取得
    const $cellCount = $(`${$aId[$i]} .card`).length; // 子要素の数を取得
    const $winWidth = $(window).width(); // ウィンドウ画面の幅を取得
    const $columnCount = Math.trunc( $winWidth / $cellWidth ); // ウィンドウ画面に設定可能なカラム数を算出
    console.log("$columnCount : " + $columnCount);
    console.log("$cellCount : " + $cellCount);
    let $lackCell = 0; // 左寄せするために不足している子要素の数を最終的に入れる
    let $gridCount = 0; // 行列（グリッド）にした場合の子要素の総数を計算するときに使用
    while ($gridCount < $cellCount) { // 行行列（グリッド）にした場合の子要素の総数を算出
      $gridCount = $gridCount + $columnCount;
      console.log("$gridCount : " + $gridCount);
    }
    $lackCell = $gridCount - $cellCount; // 左寄せするために不足している子要素の数を算出
    console.log("$lackCell : " + $lackCell);
    for (let $j = 0; $j < $lackCell; $j++) { // 左寄せするために不足している子要素の数だけ空要素を付け加える
      $(`${$aId[$i]} .cards`).append('<div class="card isEmpty"></div>');
      console.log("$j : " + $j);
    }
  }


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
