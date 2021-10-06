{ // ブロックスコープ(START)
"use strict";

const countTimer = document.getElementById("countTimer"); // カウントタイマーを表示する領域の要素取得
const lapTimeList = document.getElementById("lapTimeList"); // ラップタイムを表示する領域の要素取得
const ctrlBtn = document.querySelectorAll("#ctrlBtn button"); // ボタンの要素取得（スタート、ストップ、リセット、ラップタイム機能）
const startBtnTxt = document.querySelector("#ctrlBtn button span"); // ボタンのテキストを変更するための要素取得（スタートとリスタート）

const overStop = 5959999; // 60分の計測範囲を超える前に、計測を停止する用。

let startFlag = 0; // 0：カウントタイマー停止状態、1：稼働状態、2：エラー処理（60分の計測範囲を超えた）
let restartCnt = 0; // 0：初期値、1：スタート、2：停止、3以上；リスタートを繰り返している
let elapsedTime; // 経過時間のtmp
let startTime; // スタート時の時刻
let restartAddTime = 0; // リスタート時に必要になる時間
let lapTime = 0; // ラップタイム時間のtmp
let lapCnt = 0; // ラップボタンが押された回数をカウント
let tId; // タイマーID

// 時間（分・秒・ミリ秒）のコンストラクタ
class Msms {
	constructor(_min, _sec, _msec) {
		this.min = _min;
		this.sec = _sec;
		this.msec = _msec;
	}
}
const msms = new Array();
msms[0] = new Msms(); // elapsedTime用
msms[1] = new Msms(); // lapTime用

// ボタンが押せるか反応しないかを伝える透過処理
const btnOpacity = (_btn, _i) => {
	ctrlBtn[_btn].style.opacity = _i;
}

// 各状況においてボタンが押せるか反応しないかを伝えるための処理
const btnOnOffViewChange = (_status) => {
	if (_status === "initial") { // 初回
		btnOpacity(1, 0.2); // ストップボタンを押しても反応しないことを伝えるためopacityを減らす
		btnOpacity(2, 0.2); // リセットボタンを押しても反応しないことを伝えるためopacityを減らす
		btnOpacity(3, 0.2); // ラップボタンを押しても反応しないことを伝えるためopacityを減らす
		return;
	}
	if (_status === "err") { // エラーになったら
		btnOpacity(2, 1); // リセットボタンを押しても良いことを伝えるためopacityを戻す
		btnOpacity(1, 0.2); // ストップボタンを押しても反応しないことを伝えるためopacityを減らす
		btnOpacity(3, 0.2); // ラップボタンを押しても反応しないことを伝えるためopacityを減らす
		return;
	}
	if (_status === "start") { // スタートボタンが押されたら
		btnOpacity(1, 1); // ストップボタンを押しても良いことを伝えるためopacityを戻す
		btnOpacity(0, 0.2); // スタートボタンを押しても反応しないことを伝えるためopacityを減らす
		btnOpacity(2, 0.2); // リセットボタンを押しても反応しないことを伝えるためopacityを減らす
		if (restartCnt > 2) {
			btnOpacity(3, 0.2); // ラップボタンを押しても反応しないことを伝えるためopacityを減らす
		} else {
			btnOpacity(3, 1); // ラップボタンを押しても良いことを伝えるためopacityを戻す
		}
		return;
	}
	if (_status === "stop") { // ストップボタンが押されたら
		btnOpacity(0, 1); // スタートボタンを押しても良いことを伝えるためopacityを戻す
		btnOpacity(2, 1); // リセットボタンを押しても良いことを伝えるためopacityを戻す
		btnOpacity(1, 0.2); // ストップボタンを押しても反応しないことを伝えるためopacityを減らす
		btnOpacity(3, 0.2); // ラップボタンを押しても反応しないことを伝えるためopacityを減らす
		if (lapCnt > 0) {
			btnOpacity(0, 0.2); // スタートボタンを押しても反応しないことを伝えるためopacityを減らす
		}
		return;
	}
	if (_status === "reset") { // リセットボタンが押されたら
		btnOpacity(0, 1); // スタートボタンを押しても良いことを伝えるためopacityを戻す
		btnOpacity(2, 0.2); // リセットボタンを押しても反応しないことを伝えるためopacityを減らす
		return;
	}
	if (_status === "lap") { // ラップタイム機能ボタンが押されたら
		btnOpacity(0, 0.2); // スタートボタンを押しても反応しないことを伝えるためopacityを減らす
		return;
	}
}
btnOnOffViewChange("initial") // 初回実行 ボタンが押せるか反応しないかを伝えるための処理

// 時間の整形（_tは elapsedTimeかlapTimeが入る。　_iは　0：ストップウォッチの場合、1：ラップタイムの場合）
const timeCalc = (_t, _i) => {
	msms[_i].m = Math.floor(_t / (1000 * 60)); // 経過時間msを1000*60で割って 分 を算出
	msms[_i].s = Math.floor((_t % (1000 * 60)) / 1000); // 分 の余りを1000で割って 秒 を算出
	msms[_i].ms = _t % 1000; // 経過時間msを1000で剰余算して ミリ秒 を算出

	// 一桁の分・秒・ミリ秒にはゼロをつける
	msms[_i].m = `0${msms[_i].m}`.slice(-2);
	msms[_i].s = `0${msms[_i].s}`.slice(-2);
	msms[_i].ms = `00${msms[_i].ms}`.slice(-3);		
}

// カウントタイマー停止処理
const clearTime = () => {
	clearTimeout(tId);
}

// エラー処理（60分の計測範囲を超えたら）
const overError = () => {
	startFlag = 2; // 停止状態
	clearTime(); // カウントタイマーを停止
	btnOnOffViewChange("err") // ボタンが押せるか反応しないかを伝えるための処理
	countTimer.textContent = "error"; // HTMLへ書き出す
}

// ストップウォッチ表示
const stopwatch = () => {
	elapsedTime = Date.now() - startTime + restartAddTime; // UNIX時間の差分で 経過時間ms を算出
	timeCalc(elapsedTime, 0); // 時間の整形　ストップウォッチ
	countTimer.textContent = `${msms[0].m}:${msms[0].s}:${msms[0].ms}`; // HTMLへ書き出す
	tId = setTimeout(function () {
		stopwatch();
	}, 10);
	if (elapsedTime >= overStop) { // 計測範囲を超えたときは自動的に停止
		overError(); // エラー処理（60分の計測範囲を超えたら）
	}
}

// ラップタイム算出表示
const lapCalcView = () => {
	lapCnt++;
	lapTime = elapsedTime - lapTime; // ラップタイムの算出
	timeCalc(lapTime, 1); // 時間の整形　ラップタイム
	lapTimeList.insertAdjacentHTML("beforeend", `<li>
		<span class="list-space">${lapCnt}.</span>
		<span class="list-space">${msms[0].m}:${msms[0].s}:${msms[0].ms}</span>
		<span class="list-space">（区間タイム ${msms[1].m}:${msms[1].s}:${msms[1].ms}）</span>
	</li>`); // HTMLへ書き出す
	lapTime = elapsedTime; // 経過時間を一時的に保存
}

// スタートボタンが押されたときの処理
const startBtnProcess = () => {
	if (startFlag === 0 && lapCnt === 0) {
		startTime = Date.now(); // UNIX時間を代入
		startBtnTxt.textContent = "リスタート"; // ボタンの表記を書き換える（スタート → リスタート）
		stopwatch();
		startFlag = 1; // 稼働状態
		restartCnt++;
		btnOnOffViewChange("start") // ボタンが押せるか反応しないかを伝えるための処理
	}
}

// ストップボタンが押されたときの処理
const stopBtnProcess = () => {
	if (startFlag === 1) { // カウントタイマーが稼働中でなければ反応しない。
		startFlag = 0; // 停止状態
		restartCnt++;
		clearTime(); // カウントタイマーを停止
		restartAddTime += Date.now() - startTime; // リスタート時のために経過時間を残しておく
		if (lapCnt > 0) {
			lapCalcView(); // ラップタイム算出表示
		}
		btnOnOffViewChange("stop") // ボタンが押せるか反応しないかを伝えるための処理
	}
}

// リセットボタンが押されたときの処理
const resetBtnProcess = () => {
	if (startFlag === 0 || startFlag === 2) { // カウントタイマーが停止、もしくはエラー時でなければ反応しない。
		if (startFlag === 2) {
			startFlag = 0; // エラー時はstartFlagを停止状態にする
		}
		countTimer.textContent = "00:00:000"; // カウントタイマーを初期化
		lapCnt = 0; // ラップボタンカウントを初期化
		lapTime = 0; // ラップタイムを初期化
		restartCnt = 0; // リスタートカウントを初期化
		restartAddTime = 0; // リスタートタイムを初期化
		startBtnTxt.textContent = "スタート"; // ボタンの表記を書き換える（リスタート → スタート）
		lapTimeList.textContent = ""; // ラップタイムリストを消す
		btnOnOffViewChange("reset") // ボタンが押せるか反応しないかを伝えるための処理
	}
}

// ラップタイムボタンが押されたときの処理
const lapBtnProcess = () => {
	if (startFlag === 1 && restartCnt < 3) { // カウントタイマーが稼働中で、なおかつリスタートしていないときだけ実行する
		if (lapCnt === 0) {
			lapTimeList.textContent = ""; // ラップタイムリストを消す
			lapTimeList.insertAdjacentHTML("beforeend", `<li>
				<span class="list-space">${lapCnt}.</span>
				<span class="list-space">00:00:000</span>
			</li>`); // ラップタイムボタンが押された最初の一回目　HTMLへ書き出す
		}
		lapCalcView(); // ラップタイム算出表示
		btnOnOffViewChange("lap") // ボタンが押せるか反応しないかを伝えるための処理
	}
}

// ボタンのイベントハンドラ
for (let btn of ctrlBtn) {
	btn.addEventListener("click", function() {
		if (this.name === "start") {
			startBtnProcess();
			return;
		}
		if (this.name === "stop") {
			stopBtnProcess();
			return;
		}
		if (this.name === "reset") {
			resetBtnProcess();
			return;
		}
		if (this.name === "lap") {
			lapBtnProcess();
			return;
		}
	});
}


} // ブロックスコープ(END)
