{ // ブロックスコープ(START)
"use strict";

// 診療時間tableの色を変更
$(function() {
	$("#consultation th:contains('日')").css("background", "#f6bfbc"); // 虹色
	$("#consultation th:contains('木')").css("background", "#f6bfbc"); // 虹色
	$("#consultation td:contains('－')").css("background", "#fef4f4"); // 桜色
});

// introアニメ
$(function() {
	const $womanImg = $("#woman"); // 何回も使うので定数にする
	const $problemList = $("#problem li"); // 何回も使うので定数にする
	const $messageList = $("#message li"); // 何回も使うので定数にする
	const imgCount = $problemList.length; // problem画像の数を取得
	const displayWidth = document.documentElement.clientWidth; // スクロールバーを含まない画面幅
	const aWidth = new Array(imgCount).fill(0); // 配列aWidthの作成と初期化（横の位置の値を入れる配列）
	const aHeight = new Array(imgCount).fill(0); // 配列aHeightの作成と初期化（縦の位置の値を入れる配列）
	const womanX = Math.floor($womanImg.offset().left); // 女性画像左上のx座標値を取得
	const womanY = Math.floor($womanImg.offset().top); // 女性画像左上のy座標値を取得
	const womanWidth = $womanImg.width(); // 女性画像のwidthを取得し数値化
	const womanHeight = $womanImg.height(); // 女性画像のheightを取得し数値化
	const splitWidth = Math.floor(womanWidth / imgCount); // 女性画像のwidthをプロブレム画像の数で割り分割値を算出
	const splitHeight = Math.floor(womanHeight / imgCount); // 女性画像のHeightをプロブレム画像の数で割り分割値を算出
	aWidth[0] = womanX - 30; // aWidthの第一要素に女性画像左上のx座標値を代入（微調整値-30）
	aHeight[0] = 0; // aHeightの第一要素に0を代入
	for (let i = 1; i < imgCount; i++) { // 女性画像左上の座標値を起点にし、分割値を加算し格納
		aWidth[i] = aWidth[i-1] + splitWidth;
		aHeight[i] = aHeight[i-1] + splitHeight;
	}

	function animePrepare() { // アニメ事前処理
		const d = new $.Deferred; // Deferredオブジェクトを作成
		for (let i = imgCount - 1; i >= 0; i--) { // 配列内の数値をシャッフル
			let rand1 = Math.floor( Math.random() * ( i + 1 ) ); // ランダムな数値を取得
			let rand2 = Math.floor( Math.random() * ( i + 1 ) ); // ランダムな数値を取得
			[aWidth[i], aWidth[rand1]] = [aWidth[rand1], aWidth[i]]; // 配列の数値を入れ替える
			[aHeight[i], aHeight[rand2]] = [aHeight[rand2], aHeight[i]]; // 配列の数値を入れ替える
		}
		d.resolve().promise().then(animeProblem);
	}
	function animeProblem() { // problemアニメ
		const d = new $.Deferred;
		setTimeout(function() {
			$.when(
				$problemList.each(function(index) {
					$(this).delay(1500 * index); // problemの表示間隔
					$(this).offset({ top: aHeight[index], left: aWidth[index] }); // problemの位置指定
					$(this).fadeIn(1200); // problemをフェードイン表示
				})			
			).done(function() {
				d.resolve();
			});
			d.promise().then(animeMessage);
		}, 1700);
	}
	function animeMessage() { // messageアニメ
		const d = new $.Deferred;
		setTimeout(function() {
			$.when(
				$problemList.css("opacity", "0.1"), // problemをうっすら表示
				$womanImg.css("opacity", "0.1"), // messageをうっすら表示
				$messageList.each(function(index) {
					$(this).delay(2100 * index); // messageの表示間隔
					$(this).offset({ top: womanY + index*40, left: womanX }); // messageの位置指定
					$(this).fadeIn(1200); // messageをフェードイン表示
				})
			).done(function() {
				d.resolve();
			});
			d.promise().then(animeReset);
		}, 2500);
	}
	function animeReset() { // リセット処理
		const d = new $.Deferred;
		setTimeout(function() {
			$.when(
				$problemList.css("opacity", "1"), // problemを透過表示を戻す
				$womanImg.css("opacity", "1"), // 女性画像の透過表示を戻す
				$problemList.each(function() {
					$(this).offset({ top: womanY, left: 0 }); // problem位置の初期化
				}),
				$messageList.each(function(index) {
					$(this).offset({ top: womanY, left: 0 }); // messageの初期化
				}),
				$problemList.css("display", "none"), // problemを非表示
				$messageList.css("display", "none") // messageを非表示

			).done(function() {
				d.resolve();
			});
			d.promise().then(animePrepare);
		}, 3300);
	}
	animePrepare();
	
});

} // ブロックスコープ(END)
