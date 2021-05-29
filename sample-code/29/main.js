{ // ブロックスコープ(START)
"use strict";


// jQueryを使うよ
$(function() {
  $(".question").on("click", function() {
    $(".answer").hide("slow");
    $(this).next().slideToggle("slow");
  });


});


} // ブロックスコープ(END)
