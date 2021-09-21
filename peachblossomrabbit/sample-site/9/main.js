{ // ブロックスコープ(START)
"use strict";

const yearSelect = document.getElementById("yearSelect"); // オプション　指定年セレクトボックスの要素取得
const addYearBtn = document.querySelectorAll("#addYear input"); // オプション　ラジオボタン年付き表示の要素取得
const addMarkBtn = document.querySelectorAll("#addMark input"); // オプション　ラジオボタンマーク付き表示の要素取得
const resultView = document.getElementById("resultView"); // 結果を表示する領域の要素取得

const d = new Date(); // Dateオブジェクトのインスタンス生成
const thisYear = d.getFullYear(); // 今年を代入
let termYear = thisYear - 1; // セレクトボックスで選択できる期間を作成するときに使用　前年をセット
let setYear = thisYear; // 指定された年をセット　デフォルトは今年
let yearFlag = "yearNo"; // 年付きで表示するか判断するフラグ（yearYes：年有り、yearNo：年無し）
let markFlag = "markYes"; // 行頭にマーク"＞"付きで表示するか判断するフラグ（markYes：マーク有り、markNo：マーク無し）
addYearBtn[1].checked = true; // ラジオボタンの初期設定　年付きで表示する　なし
addMarkBtn[0].checked = true; // ラジオボタンの初期設定　行頭にマーク"＞"付きで表示する　あり

// 年を選択するセレクトボックスを作成して表示
const yearSelectBoxMaker = () => {
	const years = 5; // セレクトボックスで選択できる年数 ※：2以上指定のこと
	for (let i = 0; i < years; i++) { // 指定された年数分セレクトボックスに表示
		if (thisYear !== termYear) {
			yearSelect.insertAdjacentHTML("beforeend", `<option value="${termYear}">${termYear}年</option>`);
		} else {
			yearSelect.insertAdjacentHTML("beforeend", `<option value="${termYear}" selected>${termYear}年</option>`);
		}
		termYear++;
	}
}
yearSelectBoxMaker(); // 初回実行

// 1～9の数字の前にゼロをつけて返す
const addZero = (_date) => {
　return (`0${_date}`).slice(-2);
}

// オプションにともなう変更　行頭マークを付けるか否か返す
const optionMarkSet = () => {
	return markFlag === "markYes" ? "＞" : ""; // ラジオボタンで指定されたら各日付の行頭につけるマークを返す　三項演算子
}

// オプションにともなう変更 年付きにするか否か返す
const optionYearSet = () => {
	return yearFlag === "yearYes" ? `${setYear}/` : ""; // ラジオボタンで指定されたら年を返す　三項演算子
}

// 指定された月をHTMLへ表示
const resultOutput = (_month) => {
	const lastDate = new Date(setYear, _month, 0).getDate(); // 指定された月の末日を代入
	let week = new Date(setYear, _month-1, 1).getDay(); // 指定された月の一日（ついたち）の曜日を代入
	const optionMark = optionMarkSet(); // オプション　行頭マーク
	const optionYear = optionYearSet(); // オプション 年付き

	for (let i = 1; i <= lastDate; i++) { // 一か月分繰り返す
		const aWeek = ["日", "月", "火", "水", "木", "金", "土"]; // 日本式曜日表記の配列
	
		if ( week > 6 ) { // 土曜日までいったら日曜日に戻す
			week = 0;
		}

		// 日付リストを1行ずつ表示する
		resultView.insertAdjacentHTML("beforeend", `${optionMark}【${optionYear}${addZero(_month)}/${addZero(i)}（${aWeek[week]}）】\n`);
		week++; // 曜日を進める

	}
}

// コピー処理
const copyProcess = () => {
	resultView.select(); // コピーする日付リストを選択
  document.execCommand("copy"); // 日付リストをコピーしてクリップボードへ
}

// オプション　指定年が変更されたときの処理
yearSelect.addEventListener("change", function() {
	let index = this.selectedIndex; // 指定年のインデックスを代入
	setYear = this.options[index].value; // 指定年を代入
});

// オプション　年付き表示の指定ラジオボタンが変更されたときの処理
for (let addYear of addYearBtn) {
	addYear.addEventListener("click", function() {
		this.checked = true; // クリックされた方のラジオボタンにチェックを入れる
		yearFlag = this.value; // クリックされた方のラジオボタンの value値を代入
	});
}

// オプション　マーク付き表示の指定ラジオボタンが変更されたときの処理
for (let addMark of addMarkBtn) {
 addMark.addEventListener("click", function() {
	this.checked = true; // クリックされた方のラジオボタンにチェックを入れる
	markFlag = this.value; // クリックされた方のラジオボタンの value値を代入
 });
}

// 月ボタンがクリックされたときの処理
const monthBtn = document.querySelectorAll("#monthBtn button"); // 月を指定するボタンの要素取得
for (let btn of monthBtn) {
 btn.addEventListener("click", function() {
	resultView.textContent = ""; // 表示領域を空にする
	resultOutput(this.name); // 指定された月の月・日・曜日を表示
 });
}

// コピーボタンがクリックされたときの処理
const copyBtn = document.getElementById("copyBtn"); // コピーボタンの要素取得
copyBtn.addEventListener("click", function() {
	if (resultView.textContent) { // HTMLへ書き出されていればコピー処理を行う
		copyProcess(); // コピー処理
	}
});


} // ブロックスコープ(END)
