{ // ブロックスコープ(START)
"use strict";

const errorMsg = document.getElementById("errorMsg"); // エラーメッセージ領域の要素取得
const displayPanel = document.getElementById("displayPanel"); // 入力した値を表示する領域の要素取得
const inputBtn = document.querySelectorAll("#inputBtn > button"); // 入力ボタンの要素取得

let aCalc; // 入力された内容をためる配列
let breakFlg; // 区切りフラグ　算術演算子が打鍵されるまでをひとつの区切りとする。不適切な操作を区切りごとに抑止
let decimalPointFlg; // 小数点フラグ　連続打鍵や区切り内で複数打鍵しても反応しない
let zeroFlg; // ゼロフラグ　区切り内で1回目と2回目に連続で "0"ボタンを押すと2回目は反応しない
let errorFlg; // エラーフラグ

// 初期化
const initialize = () => {
	aCalc = [];
	breakFlg = 0;
	decimalPointFlg = 0;
	zeroFlg = 0;
	errorFlg = 0;
}
initialize(); // 初回初期化

displayPanel.value = 0; // 表示領域の初期化（起動時のみ）

// エラー表示処理
const errorProcess = (_err) => {
	errorMsg.textContent = _err;
	errorFlg = 1;
}

// 最初に入力したボタンの確認
const firstInputChk = (_btn) => {
	// 乗算ボタンエラー
	if ( breakFlg === 0 && _btn === "*" ) {
		errorProcess("ERROR: 数字を入れる前に乗算ボタンは打てません。");
		return;
	}
	// 除算ボタンエラー
	if ( breakFlg === 0 && _btn === "/" ) {
		errorProcess("ERROR: 数字を入れる前に除算ボタンは打てません。");
		return;
	}
	// イコールボタンエラー
	if ( breakFlg === 0 && _btn === "=" ) {
		errorProcess("ERROR: 数字を入れる前にイコールボタンは打てません。");
		return;
	}
}

// ゼロ入力に関する確認
const zeroChk = (_btn) => {
	// 区切り内で最初に "0" ボタンを押したら、2回目の "0" ボタンは押しても反応しない
	if ( zeroFlg === 1 && _btn === "0" ) {
		errorProcess("ERROR: ゼロボタンを2回押しませんでしたか？");
	}

	// "0" ボタンの次に数字（1～9）を入力しても反応しない
	const regExpNum = /[1-9]/; // 正規表現のパターン作成。
	if ( zeroFlg === 1 && regExpNum.test(_btn) ) {
		errorProcess("ERROR: この状況で数字ボタンは打てません。");
	}
	
	// "0" ボタンが入力されたらフラグが立つ
	if ( breakFlg === 0 && _btn === "0" ) {
		zeroFlg = 1;
	}
}

// 小数点の不適切操作に関する確認
const decimalPointChk = (_btn) => {
	// 小数点ボタンは2回目は押しても反応しない（区切り内での連続打鍵、複数打鍵はダメ）
	if ( decimalPointFlg === 1 && _btn === "." ) {
		errorProcess("ERROR: 小数点ボタンを2回押しませんでしたか？");
	}
	
	// 小数点が入力されたらフラグが立つ
	if (_btn === ".") {
		decimalPointFlg = 1;
	}	
}

// 乗除算ボタンを一般的な分かりやすい記号で表示するために変換
const correctOperatorSymbol = (_str) => {
	return _str
		.replace(/\*/g, "×")
		.replace(/\//g, "÷");
}

// メイン処理
const main = (_btn) => {
	// 区切り先頭で小数点が打鍵されたら "0"を加える
	if ( breakFlg === 0 && _btn === "." ) {
		_btn = "0" + _btn;
	}
	
	breakFlg = 1; // 区切りスタートフラグを立てる
	errorMsg.textContent = ""; // エラーメッセージ領域を空にする

	// ボタンが "=" のとき
	if (　_btn === "="　) {
		displayPanel.value = eval(aCalc.join("")); // 算出表示
		initialize();
		return;
	}

	// ボタンが "C" のときは、クリア処理をする
	if (　_btn === "clear"　) {
		initialize();
		displayPanel.value = 0;
		errorMsg.textContent = "";
		return;
	}

	aCalc.push(_btn); // 押されたボタンの内容を配列へ格納
	displayPanel.value = correctOperatorSymbol(aCalc.join("")); // 結合した配列を必要に応じて分かりやすい形にして表示
	
}

// フラグを初期値に戻す
const flagReset = (_btn) => {
	errorFlg = 0;
	
	// 算術演算子ボタンがクリックされたら一区切りとなる。小数点を打鍵できる
	if ( _btn === "+" || _btn === "-" || _btn === "*" || _btn === "/" ) {
		breakFlg = 0;
		decimalPointFlg = 0;
	}
	
	// 区切り内で先頭ゼロ打鍵して次に小数点打鍵されたら、ゼロ打鍵を許可
	if ( _btn === "." ) {
		zeroFlg = 0;
	}
}

// ボタンがクリックされたら？
for ( let btn of inputBtn ) {
 btn.addEventListener("click", function() {
	let nameBtn = this.name; // クリックされたボタンのname属性の内容を代入 いわゆるgetAttribute("name")

	firstInputChk(nameBtn); // 最初に入力したボタンの確認
	zeroChk(nameBtn); // ゼロ入力に関する確認
	decimalPointChk(nameBtn); // 小数点の不適切操作に関する確認
	
	// 上述の確認で不適切な操作があればメイン処理は行わない
	if ( errorFlg === 0 ) {
		main(nameBtn); // メイン処理　
	}
	
	flagReset(nameBtn); // 次の操作（ボタンクリック）を受けるためにフラグを初期値に戻す
	
 });
}

	
} // ブロックスコープ(END)
