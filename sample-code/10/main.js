{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  // justify-content: between;の最後の行を左寄せにする
    const $cellWidth = $('#parent .child').outerWidth(true); // 子要素の幅を取得
    const $cellCount = $('#parent .child').length; // 子要素の数を取得
    const $parentWidth = $('#parent').width(); // 親要素の幅を取得
    const $columnCount = Math.trunc( $parentWidth / $cellWidth ); // 親要素の幅に設定可能なカラム数を算出
    let $lackCell = 0; // 左寄せするために不足している子要素の数を最終的に入れる
    let $gridCount = 0; // 行列（グリッド）にした場合の子要素の総数を計算するときに使用
    while ($gridCount < $cellCount) { // 行列（グリッド）にした場合の子要素の総数を算出
      $gridCount += $columnCount;
    }
    $lackCell = $gridCount - $cellCount; // 左寄せするために不足している子要素の数を算出
    for (let $j = 0; $j < $lackCell; $j++) { // 左寄せするために不足している子要素の数だけ空要素を付け加える
      $('#parent').append('<div class="child isEmpty"></div>');
    }

});


} // ブロックスコープ(END)
