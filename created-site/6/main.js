$(function() {
"use strict";

	let $pageNumber = 1; // 最初にリクエストするページ番号 初期値は 1
	let $urlQiita; // リクエストするURL
	let $clickFlag = true; // 受信失敗したときにfalseを入れる

	const $perPage = 10; // リクエスト件数 初期値は 10

	// 変数$perPageで設定した件数と文字列を結合し書き出す。
	$("#prevText").text(`前の${$perPage}件を表示`);
	$("#nextText").text(`次の${$perPage}件を表示`);

	const $aTabElement = new Array(); // タブメニューの要素を取得して入れておく配列
	const $aTabText = new Array(); // タブメニューのテキストを入れておく配列
	$("#navList > li").each(function(_i, _e){
		$aTabElement[_i] = $(_e); // タブメニューの要素を取得して入れる
		$aTabText[_i] = $(_e).text(); // タブメニューのテキストを入れる
	});

	// 通信 待ち 処理
	const waitingProcess = () => {
		$("#titleLists").text(""); // 表示エリアtitleListsを空にする
		$("#responseLoading > img").fadeIn(); // 処理待ちぐるぐる画像を表示
	}

	// 通信 成功したときの処理
	const doneProcess = (_data) => {
		$.each(_data, function(i, _xhr){
			let $profImg = $("<td>").append($("<img>").attr("src", _xhr.user.profile_image_url).attr("alt", _xhr.user.id).attr("class", "user-img")); // 投稿者の画像を設定。CSS（.user-img）で画像の大きさを調整するためclass属性もつけた
			let $anchorTitle = $("<td>").attr("class", "anchor-title").append($("<a>").attr("href", _xhr.url).attr("target", "_blank").attr("rel", "noopener noreferrer").text(_xhr.title)); // リンク付きの記事タイトルを設定
			let $likesCount = $("<td>").text(_xhr.likes_count); // いいね数を設定
			let $tableRow = $("<tr>").append($profImg).append($anchorTitle).append($likesCount); // 上述の画像・記事タイトル・いいね数をまとめる
			$("#titleLists").append($tableRow); // 表示エリアtitleListsに、tableRowの内容をエスケープ後に書き出す
		})
	}

	// 通信 失敗したときの処理
	const failProcess = () => {
		$("#responseLoading > img").remove(); // 処理待ちぐるぐる画像を削除
		$("#tableArea").css("opacity", ".1"); // tableの見出しを薄くする
		$("#responseFail > p").fadeIn("fast"); // 通信に失敗した旨のメッセージを表示する
		$clickFlag = false; // タブメニューなどをクリックできないようにする
	}

	// 通信 完了したときの処理
	const alwaysProcess = () => {
		$("#responseLoading > img").fadeOut(); // 処理待ちぐるぐる画像を非表示
	}

	// Qiita API のURLを生成
	const urlMake = (_tagId) => {
		$urlQiita = `https://qiita.com/api/v2/tags/${_tagId}/items?`;
	}

	// Qiitaサーバからデータを受け取り処理する
	const getTitles = () => {
		$.ajax({ // 通信プロトコル
			url: $urlQiita,
			type: "GET",
			beforeSend: waitingProcess(), // 通信待ち
			data: {
				page: $pageNumber,
				per_page: $perPage
			},
			dataType: "json",
			cache: true
		}).done(function(data) {
			doneProcess(data); // 通信成功
		}).fail(function() {
			failProcess(); // 通信失敗
		}).always(function() {
			alwaysProcess(); // 通信完了
		});
	}

	// タブメニューの表示スタイルを変更
	const tabStyleChange = (_tab) => {
		for (let i = 0; i < $aTabText.length; i++) {
			if (_tab === $aTabText[i]) { // クリックされたメニューのタブをアクティブと分かるスタイルにする
				$aTabElement[i].removeClass("nav-inactive");
				$aTabElement[i].addClass("nav-active");
			} else { // クリックされたメニューのタブ以外は非アクティブと分かるスタイルにする
				$aTabElement[i].removeClass("nav-active");
				$aTabElement[i].addClass("nav-inactive");
			}
		}
	}

	//　「前の10件を表示」の表示非表示
	const previousHide = () => {
		if ($pageNumber > 1) {
			$("#nextPrev > li > span").eq(0).show(); // 表示
		} else {
			$("#nextPrev > li > span").eq(0).hide(); // 非表示
		}
	}

	// 初回実行
	urlMake($aTabText[0]); // tagId「HTML」のURLを生成
	getTitles(); // Qiita API データ受信処理
	previousHide(); // 「前の10件を表示」を非表示にする

	// タブメニューのクリック切り替え処理
	$("#navList > li").click(function () {
		if ($clickFlag) { // 受信成功したら実行
			let $selectTab = $(this).text(); // クリックされたタブのテキスト内容を代入
			$pageNumber = 1; // リクエストするページ番号を1にする
			previousHide(); // 「前の10件を表示」を表示する
			urlMake($selectTab); // クリックされたタブのtagIdでURLを生成
			getTitles(); // Qiita API データ受信処理
			tabStyleChange($selectTab); // タブメニューのスタイルを変更
		}
	});

	// クリックするごとに前の10件を表示する
	$("#nextPrev > li").eq(0).click(function () {
		if ($clickFlag && $pageNumber > 1) { // 受信成功し、かつ2ページ目以降なら実行
			$pageNumber--; // 前のページ番号をリクエストする
			getTitles(); // Qiita API データ受信処理
			previousHide(); // 「前の10件を表示」の表示非表示
		}
	});

	// クリックするごとに次の10件を表示する
	$("#nextPrev > li").eq(1).click(function () {
		if ($clickFlag) { // 受信成功したら実行
			$pageNumber++; // 次のページ番号をリクエストする
			getTitles(); // Qiita API データ受信処理
			previousHide(); // 「前の10件を表示」の表示非表示
		}
	});

});
