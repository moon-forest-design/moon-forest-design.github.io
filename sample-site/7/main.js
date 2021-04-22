{ // ブロックスコープ(START)
"use strict";


const result = document.getElementById("result"); // Top 10をHTML出力する場所の要素取得
const responseLoadingImg = document.getElementById("responseLoadingImg"); // 処理待ち画像の表示に使用する要素取得
const pagination = document.querySelectorAll("#pagination > li > span"); // 

let requestURL; // リクエストするURL。期間ごとに変わるのでlet
let rankingCnt = 1; // ランキングのカウント（1位から10位まで数える）
let pageNumber = 1; // 何ページ目を表示しているのかカウントする

// 年の設定
const d = new Date();
let currentYear = d.getFullYear(); // 今年を設定　ページごとに変わるのでlet

// サイトタイトルの年度の表示をページごとに変換する
const titleYearChange = () => {
	const thisYear = document.getElementById("thisYear"); // サイトタイトルに使用する年度部分に使用する要素取得
	thisYear.textContent = currentYear; // ページごとの年度を設定
}

// リクエストするURLを設定する
const setURL = () => {
	const setLang = "JavaScript"; // リクエストするリポジトリのプログラミング言語を指定
	requestURL = `https://api.github.com/search/repositories?q=language:${setLang}+created:${currentYear}-01-01..${currentYear}-12-31&sort=stars&order=desc`;
}

// 文字列の長さでレイアウトを崩されないよう調整する
const stringAdjust = (_string, _stringLimit) => {
	if (!_string) {
		return ""; // 文字列がnullなら空文字を入れる
	} else if (_string.length < _stringLimit) {
		return _string; // 文字列が文字数制限内ならそのまま
	} else {
		return `${_string.substr(0, _stringLimit)}...`; // 文字列が文字数制限を越える場合は途中でカット
	}
}

// HTML特殊文字をエスケープ処理
const escapeSpecialChars = (_str) => {
	return _str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

// Top 10をHTMLへ出力する
const outputView = (_json) => {
	// result.textContent = ""; // result領域を空にする
	for (let j of _json.items) {
		if (rankingCnt > 10) { // ランキング10位まで表示する。
			rankingCnt = 1; // 処理が終わったら戻しておく
			return; // 11になったら抜ける
		}
		let jName = stringAdjust(j.name, 30); // リポジトリ名が長すぎるとレイアウトを崩すので30字でカットする
		let jDescription = stringAdjust(j.description, 100); // リポジトリの説明文が長すぎるとレイアウトを崩すので100字でカットする
		jDescription = escapeSpecialChars(jDescription); // リポジトリの説明文にHTMLの特別な記号が使われている場合はエスケープ処理する
		const htmlTemplate = `
			<div class="col-sm-12 col-md-4 col-lg-3 col-xl-2">
				<section class="mx-2 mb-5">
					<a href="j.html_url" class="text-warning">
				
						<div><span class="display-4 font-weight-bold">${rankingCnt}</span> ( ★ ${j.stargazers_count} )</div>
						
						<h2 class="heading">${j.owner.login}</h2>

						<img src="${j.owner.avatar_url}" alt="${jName}" class="img-fluid rounded">

						<h3 class="heading">${jName}</h3>
						<p class="text-left">${jDescription}</p>

					</a>
				</section>
			</div>
		`;
		result.insertAdjacentHTML("beforeend", htmlTemplate); // Top 10の人たちの各リポジトリをHTMLへ出力
		rankingCnt++; // ランキングカウントをひとつ進める
	}
}

// 通信待ちの処理
const waitingProcess = () => {
	responseLoadingImg.style.display = "block"; // 処理待ちぐるぐる画像を表示
}
	
// 通信失敗したときの処理
const failProcess = (_error) => {
	result.textContent = ""; // result領域を空にする
	result.insertAdjacentHTML("beforeend", "<p class='col-sm-12 text-danger'>Data reception failed.　After a while, try pressing the reload button on your　web　browser. sorry.</p>"); // エラーメッセージをHTMLへ出力
	console.error(_error); // エラーの内容をコンソール表示
}

// 通信 完了したときの処理
const afterProcess = () => {
	responseLoadingImg.style.display = "none"; // 処理待ちぐるぐる画像を非表示
}

// GitHub API データ受信処理
const fetchProcess = () => {
	fetch(requestURL, {
			method: "GET",
			header: {
				Accept: "application/vnd.github.mercy-preview+json"
			}
		}).then((response) => {
			waitingProcess(); // 通信待ちの処理
			if (response.ok) {
				return response.json(); // 通信が成功したらjsonデータを渡す
			} else {
				return Promise.reject(new Error(`${response.status}: ${response.statusText}`)); // 通信が失敗したらエラー内容を渡す
			}
		}).then((json) => {
			outputView(json); // Top 10をHTMLへ出力
		}).then(() => {
			afterProcess(); // 通信 完了したときの処理
		}).catch((error) => {
			failProcess(error); // 通信 失敗したときの処理
		});
}

//　ページネーションの表示非表示
const paginationHide = () => {
	// Following yearの表示非表示
	if (pageNumber > 1) {
		pagination[0].style.display = "block";
	} else {
		pagination[0].style.display = "none";
	}
	// Previous yearの表示非表示
	if (currentYear > 2008) { // GitHubの設立は2008年04月
		pagination[1].style.display = "block";
	} else {
		pagination[1].style.display = "none";
	}
}

// 初回表示
titleYearChange(); // サイトタイトルの年度の表示を変換
setURL(); // リクエストするURLを設定
fetchProcess(); // GitHub API データ受信処理
paginationHide(); // ページネーションの表示非表示

// クリックされたら前年もしくは翌年を表示
for (let year of pagination) {
	year.addEventListener("click", function() {
		result.textContent = ""; // result領域を空にする
		if (this.dataset.pagenation === "followingYear") {
			pageNumber--; // 翌年を表示するのでページ番号は減る
			currentYear++; // 未来へ進むので現在年は増える
		} else if (this.dataset.pagenation === "previousYear") {
			pageNumber++; // 前年を表示するのでページ番号は増える
			currentYear--; // 年をさかのぼるので現在年は減る
		} else {
			console.log("ERROR: HTMLが書き換えられた可能性あり");
		}
		titleYearChange() // サイトタイトルの年度の表示を変換
		setURL(); // リクエストするURLを設定
		fetchProcess(); // GitHub API データ受信処理
		paginationHide(); // ページネーションの表示非表示
	});
}


} // ブロックスコープ(END)
