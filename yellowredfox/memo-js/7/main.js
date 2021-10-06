"use strict";

// 高階関数が戻り値として関数を返す「カリー化」と呼ばれるテクニック

// 高階関数add
const add = num1 => num2 =>
  console.log(num1 + num2);

// STEP1：num1の値が決まった時点で関数addに引数として渡して実行し、いったんpendingに入れておく
const pending = add(1);

// ～この間にデータ取得待ちなどが発生し、実行できる常態になったらSTEP2を行う～

// STEP2：関数pendingにnum2を入れて実行する
pending(2);
