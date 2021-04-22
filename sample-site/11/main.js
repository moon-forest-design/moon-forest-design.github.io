{ // ブロックスコープ(START)
	"use strict";

// ゲームプレイヤーの使用画面にあわせたcanvasの幅と高さを調整するための変数と設定
const canvas = document.getElementById("canvas"); // canvasの要素取得
const header = document.getElementById("header"); // headerの要素取得
const ctrlPanel = document.getElementById("ctrlPanel"); // ctrlPanelの要素取得
const headerHeight = header.clientHeight; // headerの高さを取得
const ctrlPanelHeight = ctrlPanel.clientHeight; // ctrlPanelの高さを取得
const canvasWidth = document.documentElement.clientWidth; // スクロールバーを含まない幅を取得（canvasの幅に使う）
const canvasHeight = document.documentElement.clientHeight - headerHeight - ctrlPanelHeight; // headerとctrlPanelを含まない高さを算出（canvasの高さに使う）
canvas.setAttribute("width", canvasWidth); // canvasのwidthを書き換える
canvas.setAttribute("height", canvasHeight); // canvasのheightを書き換える

// 効果音に関する変数と設定
const soundEffectSelect = document.querySelectorAll("#soundEffectSelect .soundEffectSelect__item"); // オプション　効果音の要素取得
soundEffectSelect[0].checked = true; // ラジオボタンの初期設定　効果音ありにチェックあり
soundEffectSelect[1].checked = false; // ラジオボタンの初期設定　効果音なしはチェックなし

// ゲーム内容に関する変数と設定
const ctrlBtn = document.querySelectorAll("#ctrlPanel .ctrlBtn"); // 操作ボタン（4つ）の要素取得
const gameOver = document.getElementById("gameOver"); // gameOverの要素取得
const canvasHalfWidth = Math.floor(canvasWidth / 2); // canvasの幅のおおよそ半分
const fontSizeNum = 100; // 「落ちる数字」のフォントサイズ
const fontSizeScore = 16; // スコア（獲得ポイント）のフォントサイズ
const defaultY = -fontSizeNum; // 「落ちる数字」の開始位置 y座標
const abyss = canvasHeight + fontSizeNum; // 「落ちる数字」が落ちきった底の位置
const dY = 2; // 「落ちる数字」の移動数値（数値が大きいほど速く落ちるように見える）
let gameStartFlg = false; // ゲームスタートフラグ：スタートボタンを押されたらゲームを開始するためのフラグ
let gameOverFlg; // ゲームオーバーフラグ：ミスしたらゲームを終了させるためのフラグ
let moveY; // 「落ちる数字」を動かすためのy座標値：最初は初期値を入れておく。dYを加算して動かす
let dropDownNum; // 「落ちる数字」をカウントアップする
let buttonClicked ; // クリックされたボタンの内容（textContent）を格納する
let scoreTotal; // スコア（獲得ポイント）の合計

// 初期設定
const initSetting = () => {
	gameOverFlg = false; // ゲームオーバーフラグ：ミスしたらゲームを終了させるためのフラグ
	moveY = defaultY; // 「落ちる数字」を動かすためのy座標値：最初は初期値を入れておく。dYを加算して動かす
	dropDownNum = 1; // 「落ちる数字」をカウントアップする
	ctrlBtn[3].textContent = dropDownNum; // 数字ボタンの数値を 1に戻す
	buttonClicked = ""; // クリックされたボタンの内容（textContent）を格納する
	scoreTotal = 0; // スコア（獲得ポイント）の合計
}

// 「落ちる数字」のアニメーションを描画
const drawNum = (ctx) => {
	ctx.textAlign = "center"; // 「落ちる数字」を中央に表示する
	ctx.font = `${fontSizeNum}px sans-serif`; // 「落ちる数字」のフォントを指定
	ctx.fillStyle = "#fff"; // 「落ちる数字」の中の色を指定
	ctx.fillText(dropDownNum, canvasHalfWidth, moveY); // 「落ちる数字」の数値、x座標、y座標を指定
	ctx.strokeStyle = "#ccc"; // 「落ちる数字」の縁の色を指定
	ctx.strokeText(dropDownNum, canvasHalfWidth, moveY); // 「落ちる数字」の縁の数値、x座標、y座標を指定
	moveY += dY; // 「落ちる数字」の移動数値を加算して、「落ちる数字」のy座標を変更して動いているように見せる
};

// スコア（獲得ポイント）を描画
const drawScore = (ctx) => {
	const scoreText = `SCORE : ${scoreTotal}`;
	ctx.textAlign = "left"; // スコア（獲得ポイント）を左揃えで表示する
	ctx.fillStyle = "#fff"; // スコア（獲得ポイント）の色を指定
	ctx.font = `${fontSizeScore}px sans-serif`; // スコア（獲得ポイント）のフォントを指定
	ctx.fillText(scoreText, 20, 30); // スコア（獲得ポイント）の数値、x座標、y座標を指定
};

// ゲーム画面に関する描画
const draw = () => {
	const ctx = canvas.getContext("2d"); // 描画コンテキストを取得
	ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 描画ごとにcanvas画面を事前にクリアする
	drawNum(ctx); // 「落ちる数字」のアニメーションを描画
	drawScore(ctx); // スコア（獲得ポイント）を描画
};

// 「落ちる数字」の正解を出しておく
const giveTheCorrectAnswer = () => {
	if (dropDownNum % 3 === 0 && dropDownNum % 5 === 0) {
		return "FizzBuzz"; // 「落ちる数字」が、3でも5でも割り切れるときは、"FizzBuzz"を返す
	}
	if (dropDownNum % 3 === 0) {
		return "Fizz"; // 「落ちる数字」が、3で割り切れるときは、"Fizz"を返す
	}
	if (dropDownNum % 5 === 0) {
		return "Buzz"; // 「落ちる数字」が、5で割り切れるときは、"Buzz"を返す
	}
	return dropDownNum + ""; // 「落ちる数字」が、上述の条件にあてはまらないときは、数値を返す（※：型を文字列に変換しておくこと）
};

// 次に「落ちる数字」の準備
const setNext = () => {
	scoreTotal++; // スコア（獲得ポイント）加算
	dropDownNum++; // 「落ちる数字」の数値を進める
	ctrlBtn[3].textContent = dropDownNum; // 数字ボタンの数値を次の数値に変更する
	moveY = defaultY; // 「落ちる数字」の位置を開始位置に戻す
	buttonClicked = ""; // クリックされたボタンの格納情報をクリア
};

// ビープ音：正解 or ゲームオーバーの音を出す。効果音がOFFの場合は処理しない
const beep = (beepType) => {
	if (!soundEffectSelect[0].checked) {
		return; // 効果音がOFFの場合は何も処理せず戻る
	}
	if (beepType === "correct") {
		const soundEffectCorrect = document.getElementById("soundEffectCorrect"); // 正解音の要素取得
		soundEffectCorrect.currentTime = 0; // クリックされたらすぐに音が出るように 0を設定（前の効果音が終わるのを待たない）
		soundEffectCorrect.play(); // 正解音を再生
	} else if (beepType === "gameover") {
		const soundEffectGameOver = document.getElementById("soundEffectGameOver"); // ゲームオーバー音の要素取得
		soundEffectGameOver.play(); // ゲームオーバー音を再生
	} else {
		console.log("ERR: beep type error."); // ありえないはずのエラー
	}
}

// プレイヤーの操作を評価する
// ※：ゲーム継続の条件1　正解となるボタンをクリックする
const buttonClickedEvaluation = (correctAnswer) => {
	if (buttonClicked === correctAnswer) {
		beep("correct"); // ビープ音：正解の音
		setNext(); // ゲーム継続なら、次に「落ちる数字」を準備
	} else {
		gameOverFlg = true; // 不正解なら、ゲームオーバー
	}
}

// ゲームオーバー後の処理
const afterGameOver = (tId) => {
	clearTimeout(tId); // ゲームオーバーフラグが起ったらsetTimeoutによる繰り返しを停止
	beep("gameover"); // ビープ音：ゲームオーバーの音
	for (let btn of ctrlBtn) {
		btn.classList.remove("btnClickAllowed"); // ゲーム操作ボタンのクリック感を解除して操作の無効性を伝える
		btn.style.opacity = 0.3; // ゲーム操作ボタンの色味を落として操作の無効性を伝える
	}
	gameOver.classList.remove("hidden"); // ゲームオーバー画面を表示する
};

// canvasが使えるブラウザであればゲームを実行
const CanRunTheGame = () => {
	if (!canvas.getContext) {
		return; // ブラウザ対応確認 canvasが使えないブラウザならゲームを実行せず
	}

	for (let btn of ctrlBtn) {
		btn.classList.add("btnClickAllowed"); // ゲーム操作ボタンにクリック感を出して操作の有効性を伝える
		btn.style.opacity = 1; // ゲーム操作ボタンの色味を戻して操作の有効性を伝える
	}

	draw(); // ゲーム画面に関する描画

	const correctAnswer = giveTheCorrectAnswer(); // 「落ちる数字」の正解を出しておく
	if (buttonClicked) {
		buttonClickedEvaluation(correctAnswer); // プレイヤーの操作を評価する
	}
	if ( moveY > abyss) {
		gameOverFlg = true; // ※：ゲーム継続の条件2　「落ちる数字」が奈落の底まで落ち切る前に正解すること。間に合わなければ、ゲームオーバー
	}

	const tId = setTimeout(CanRunTheGame, 10); // 10msおきに関数CanRunTheGameを呼び出し繰り返す
	if (gameOverFlg) {
		afterGameOver(tId); // ゲームオーバー後の処理
	}

};

// オプション　効果音を指定するラジオボタンがクリック（変更）されたときの対応
for (let sE of soundEffectSelect) {
	sE.addEventListener("click", function() {
		if (this.name === "soundEffectOn") {
			soundEffectSelect[0].checked = true; // 効果音ありのラジオボタンにチェックを入れる
			soundEffectSelect[1].checked = false; // 効果音なしのラジオボタンのチェックを外す
		} else if (this.name === "soundEffectOff") {
			soundEffectSelect[0].checked = false; // 効果音ありのラジオボタンのチェックを外す
			soundEffectSelect[1].checked = true; // 効果音なしのラジオボタンにチェックを入れる
		}
	});
}

// スタートボタンをクリックされたときの対応
const startBtn = document.getElementById("startBtn"); // startBtnの要素取得
const gameManual = document.getElementById("gameManual"); // gameManualの要素取得
gameManual.classList.add("scale");
startBtn.addEventListener("click", function() {
	initSetting(); // 各種変数の初期化
	gameStartFlg = true; // スタートボタンがクリックされたらフラグを起てる
	gameManual.classList.add("hidden"); // gameManual（ゲーム説明）を非表示にする
	CanRunTheGame(); // canvasが使えるブラウザであればゲームを実行
});

// ゲーム操作ボタンをクリックされたときの対応
for (let btn of ctrlBtn) {
	btn.addEventListener("click", function() {
		// スタートボタンがクリックされていれば、ゲーム操作ボタンは反応する
		if (gameStartFlg) {
			buttonClicked = this.textContent; // クリックされたゲーム操作ボタンのtextContentを格納
		}
	});
}

// リスタートボタンをクリックされたときの対応
// スタートボタンがクリックされたときの対応と同じ内容
const reStartBtn = document.getElementById("reStartBtn"); // startBtnの要素取得
reStartBtn.addEventListener("click", function() {
	initSetting(); // 各種変数の初期化
	gameStartFlg = true; // リスタートボタンがクリックされたらフラグを起てる
	gameOver.classList.add("hidden"); // 「GAME OVER」を非表示にする
	CanRunTheGame(); // canvasが使えるブラウザであればゲームを実行
});




} // ブロックスコープ(END)
	