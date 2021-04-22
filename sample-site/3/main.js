{ // ブロックスコープ(START)
"use strict";


const actionBtn = document.getElementById("actionBtn"); // ボタン領域の要素取得
const monthEng = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"); // 月の英字表記

let flag; // 処理工程を管理するためのフラグ（1セット16行程）
let pomodoroCount = 0; // 作業した回数（ポモドーロ達成数）をカウントする
let dNow; // 現在時刻のDate()オブジェクトで生成したインスタンスを受け取る

let dGoal = new Date(); // 目標時刻のDate()オブジェクトのインスタンス生成（作業の目標時刻、休憩の目標時刻に使用）

// 現在時刻のDate()オブジェクトのインスタンスを生成して返す
const newDate = () => {
	return new Date();
}

// 時間（分と秒）のコンストラクタ
class MinSec {
	constructor(_min, _sec) {
		this.min = _min;
		this.sec = _sec;
	}
}
const setWork = new MinSec(25, 0); // 設定用　作業時間（分、秒）　設定値：（25, 0）
const setBreak = new MinSec(5, 0); // 設定用　休憩時間（分、秒）　設定値：（5, 0）
const setLongBreak = new MinSec(20, 0); // 設定用　長めの休憩時間（分、秒）　設定値：（20, 0）

// ボタン用のテキスト（一つのボタンで二つの機能）
const textBtn = [
	"START WORK", // ボタンに「START WORK」と表示したいときに使う
	"BREAK TIME" // ボタンに「BREAK TIME」と表示したいときに使う
];

// 進捗メッセージ用のテキスト
const textMsg = [
	"「START WORK」ボタンを押すと、タイマーが起動します。",
	"「START WORK」ボタンを押して、作業を続けましょう！",
	"作業の目標時刻は、",
	"休憩の目標時刻は、",
	"「BREAK TIME」ボタンを押して、短い休憩をとりましょう！",
	"「BREAK TIME」ボタンを押して、長めの休憩をとりましょう！",
	"お疲れさまでした!!　まだ頑張れる人は、ボタンを押して、作業を続けましょう！"
];

// タイムログ用のテキスト
const textLog = [
	"pomodoro start working",
	"Waiting operation",
	"start short breaking",
	"start long breaking",
	"pomodoro completed"
];

// ビープ音（鳩時計）を発する
const beep = () => {
	document.getElementById("sound").play();
}

// 一桁の時分秒にはゼロをつけて返す
const addZero = (_hourMinSec) => {
	return ("0" + _hourMinSec).slice(-2);
}

// タイムカウンター内のテキスト表示
const counterView = (_viewMin, _viewSec) => {
	const timer = document.getElementById("timer"); // タイムカウンター表示領域の要素取得
	if (_viewMin < 0) { // 分の数値がマイナスになったときはゼロを代入（念のため）
		_viewMin = 0;
	}
	if (_viewSec < 0) { // 秒の数値がマイナスになったときはゼロを代入（念のため）
		_viewSec = 0;
	}
	timer.textContent = `${addZero(_viewMin)} : ${addZero(_viewSec)}`; // カウントダウンするタイマーを表示
}

// 目標時刻をセット
const setGoalTime = (_countMin, _countSec) => {
	dGoal = newDate(); // 現在時刻のインスタンスを生成しdGoalへ代入
	dGoal.setMinutes(dNow.getMinutes() + _countMin); // 現在の時間（分）に設定値を足して目標の時間（分）にセットする
	dGoal.setSeconds(dNow.getSeconds() + _countSec); // 現在の時間（秒）に設定値を足して目標の時間（秒）にセットする
	dGoal.setMilliseconds(0); // 計算にバラつきが出ないようにミリ秒には0を入れておく
}

// 分秒の計算
const timeCalc = () => {
	dNow = newDate(); // 現在時刻のインスタンスを生成しdNowへ代入
	const rest = dGoal.getTime() - dNow.getTime(); // 目標時刻から現在時刻を減算して残りを出す
	const min = Math.floor(rest / 1000 / 60) % 60; // 分の算出
	const sec = Math.floor(rest / 1000) % 60; // 秒の算出
	return [min, sec]; // 分秒を配列で返す
}

// カウントダウンタイマー
const countDownTimer = () => {
	let aMinSec = timeCalc(); // 算出した分秒を配列aMinSecへ格納
	counterView(aMinSec[0], aMinSec[1]); // カウンターを表示する（aMinSec[0]：目標時刻の分、aMinSec[1]：目標時刻の秒）
	
	let tId = setTimeout(countDownTimer, 500); // 500m秒ごとにカウントダウンタイマー処理を繰り返す
	
	// 分秒がゼロになったら停止する
	if (aMinSec[0] <= 0 && aMinSec[1] <= 0) {
		clearTimeout(tId); // setTimeoutの停止
		flag++; // 次のステップへ進めるようにフラグを加算
		beep(); // ビープ音を発する
		mainFlow(); // 次のステップへ進む
	}
}

// ボタン内のテキスト表示
const btnTextView = (_startBtn) => {
	actionBtn.textContent = _startBtn;
}

// タイムログに表示する日付の作成（月 日 時:分：秒）
const timeLogDateMake = () => {
	dNow = newDate(); // 現在時刻のインスタンスを生成しdNowへ代入
	return `
		${monthEng[dNow.getMonth()]} ${dNow.getDate()} 
		${addZero(dNow.getHours())}:${addZero(dNow.getMinutes())}:${addZero(dNow.getSeconds())}
	`;
}

// メッセージ内で表示する目標時刻の作成（時分）
const goalTimeMake = () => {
	return `${addZero(dGoal.getHours())}時 ${addZero(dGoal.getMinutes())}分`;
}

// メッセージの表示
const messageView = (_txtMsg) => {
	const messageBoard = document.getElementById("messageBoard"); // メッセージボード表示領域の要素取得
	const resultCount = document.getElementById("resultCount"); // ポモドーロ数表示領域の要素取得
	const goalTime = goalTimeMake(); // メッセージ内で表示する目標時刻を代入

	if (flag % 2 === 0) {
		messageBoard.textContent = _txtMsg; // flagが偶数のときはテキストメッセージをそのまま表示する
		resultCount.textContent = `${pomodoroCount}`; // ポモドーロ数表示領域にポモドーロ数を表示する
	} else {
		messageBoard.textContent = `${_txtMsg}${goalTime}です。`; // flagが奇数のときはテキストメッセージに目標時刻をつけて表示する
	}
}

// タイムログの表示
const timeLogView = (_timeLog) => {
	const timeLogBoard = document.getElementById("timeLogBoard"); // タイムログ表示領域の要素取得
	const startTime = timeLogDateMake(); // 開始時刻　取得
	
	// 開始・目標時刻の表示　フラグが以下の場合はポモドーロ数をつけて表示する
	if (flag === 1 || flag === 5 || flag === 9 || flag === 13 || flag === 16) {
		timeLogBoard.insertAdjacentHTML("beforeend", `<div>${startTime} ${pomodoroCount} ${_timeLog}</div>`);
	} else {
		timeLogBoard.insertAdjacentHTML("beforeend", `<div>${startTime} ${_timeLog}</div>`);
	}
}

// ボタンが反応しないことを分かりやすくする
const btnOpacity = (_onOff) => {
	if (_onOff === "on") {
		actionBtn.style.opacity = 1;
	} else {
		actionBtn.style.opacity = 0.6;
	}
}

// 初期化・初期表示
const initialization = () => {
	flag = 0; // 処理行程をしめすフラグを第一段階にセット
	counterView(setWork.min, setWork.sec); // タイムカウンターに設定時刻（例：「25:00」）を表示しておく
	btnTextView(textBtn[0]); // ボタンに「START WORK」を表示しておく
	messageView(textMsg[0]); // ポモドーロ開始を促すメッセージを表示しておく
}
initialization(); // 初回実行

// メイン処理　1セット16行程（4ポモドーロ）
const mainFlow = () => {
	timeLogDateMake(); // タイムログに表示する日付の作成

	switch (flag) {
		case 0:
			break;
		case 2: // 1回目休憩待ち
		case 6: // 2回目休憩待ち
		case 10: // 3回目休憩待ち
			btnOpacity("on");
			timeLogView(textLog[1]); // タイムログに操作待ち状態である旨を表示
			messageView(textMsg[4]); // 短い休憩を促すメッセージを表示する
			btnTextView(textBtn[1]); // ボタンに「BREAK TIME」と表示
			break;
		case 4: // 1回目作業待ち
		case 8: // 2回目作業待ち
		case 12: // 3回目作業待ち
			btnOpacity("on");
			timeLogView(textLog[1]); // タイムログに操作待ち状態である旨を表示
			messageView(textMsg[1]); // 作業開始を促すメッセージを表示する
			btnTextView(textBtn[0]); // ボタンに「START WORK」と表示
			break;
		case 1: // 1回目作業中
		case 5: // 2回目作業中
		case 9: // 3回目作業中
		case 13: // 4回目作業中
			pomodoroCount++;
			btnOpacity("off");
			setGoalTime(setWork.min, setWork.sec); // 作業の目標時刻をセット
			timeLogView(textLog[0]); // タイムログに作業を開始した旨を表示
			messageView(textMsg[2]); // 作業目標時刻メッセージを表示する
			countDownTimer(); // 作業時ののカウントダウンタイマー
			break;
		case 3: // 1回目休憩中
		case 7: // 2回目休憩中
		case 11: // 3回目休憩中
			btnOpacity("off");
			setGoalTime(setBreak.min, setBreak.sec); // 短い休憩の目標時刻をセット
			timeLogView(textLog[2]); // タイムログに短い休憩を開始した旨を表示
			messageView(textMsg[3]); // 短い休憩目標時刻メッセージを表示する
			countDownTimer(); // 休憩時のカウントダウンタイマー
			break;
		case 14: // 4回目休憩待ち
			btnOpacity("on");
			timeLogView(textLog[1]); // タイムログに操作待ち状態である旨を表示
			messageView(textMsg[5]); // 長い休憩を促すメッセージを表示する
			btnTextView(textBtn[1]); // ボタンに「BREAK TIME」と表示
			break;
		case 15: // ４回目休憩中（長め）
			btnOpacity("off");
			setGoalTime(setLongBreak.min, setLongBreak.sec); // 長い休憩の目標時刻をセット
			timeLogView(textLog[3]); // タイムログに長い休憩を開始した旨を表示
			messageView(textMsg[3]); // 長い休憩目標時刻メッセージを表示する関数へ
			countDownTimer(); // 長めの休憩時のカウントダウンタイマー
			break;
		case 16: // 終了
			btnOpacity("on");
			timeLogView(textLog[4]); // タイムログに1セット終了した旨を表示
			messageView(textMsg[6]); // 1セット終了メッセージを表示する
			btnTextView(textBtn[0]); // ボタンに「START WORK」と表示
			break;
		default:
			console.log("エラー"); // エラーメッセージ
			break;
	}
}

// ボタンがクリックされたときの処理
actionBtn.addEventListener("click", function() {
	// フラグが最終行程16に達したら初期化する
	if (flag === 16) { 
		initialization();
	}
	// クリック制御　作業中・休憩中はクリックしても反応しない
	if (flag % 2 === 0) {
		flag++; // 次のステップへ進めるようにフラグを加算
		mainFlow(); // 次のステップへ進む
	}
});


} // ブロックスコープ(END)
