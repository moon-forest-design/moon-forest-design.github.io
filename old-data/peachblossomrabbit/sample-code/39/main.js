{ // ブロックスコープ(START)
"use strict";

const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  autoplay: true, // 自動再生するか？
  loop: true, // 繰り返し再生するか？
  speed: 1000, // 画像が切り替わる速度

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});


} // ブロックスコープ(END)
