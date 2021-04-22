{ // ブロックスコープ(START)
"use strict";

const addInput = document.getElementById("addInput"); // 追加入力欄の要素取得
const addBtn = document.getElementById("addBtn"); // 追加ボタンの要素取得
const taskList = document.getElementById("taskList"); // 作業リストの要素取得

let taskCnt = 0; // 追加されたタスクを数える。カウント値は識別番号の役割も担う
const aChkBox = new Array(); // チェックボタンの取得要素を格納する配列
const aEdit = new Array(); // 編集ボタンの取得要素を格納する配列
const aUpdate = new Array(); // 更新ボタンの取得要素を格納する配列
const aEditInput = new Array(); // 編集入力欄の取得要素を格納する配列
const aDel = new Array(); // 削除ボタンの取得要素を格納する配列

// HTML特殊文字をエスケープ処理
const escapeSpecialChars = (_str) => {
	return _str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

// 入力タスクのコンストラクタ
class Task {
	constructor(_content, _viewFlag, _editFlag) {
		this.content = _content; // 入力されたタスク
		this.viewFlag = _viewFlag; // 表示フラグ
		this.editFlag = _editFlag; // 編集フラグ
	}
}
const task = new Array();

// 入力タスクのインスタンス生成
const taskAccumulate = () => {
	task[taskCnt] = new Task(
		escapeSpecialChars(addInput.value), // task[taskCnt].content　入力された中身をエスケープして入れておく　
		0, // task[taskCnt].viewFlag  0：作業予定（初期値）、1：チェックあり、2：チェックなし、3：編集、4：更新、5：削除
		0, // task[taskCnt].editFlag  0：更新ボタンは無反応（初期値）、1：更新ボタンを押せる
	);
}

// 各種ボタンを作成して返す
const btnMake = (_i, _type) => {
	switch (_type) {
		case 1: // チェックボックス
			return `<input id="chkBox${_i}" class="chk-box" type="checkbox">`;
			break;
		case 2: // edit ボタン
			return `<button id="editBtn${_i}" class="task-list-btn bg-edit">編集</button>`;
			break;
		case 3: // update ボタン
			return `<button id="updateBtn${_i}" class="task-list-btn bg-update">更新</button>`;
			break;
		case 4: // del ボタン
			return `<button id="delBtn${_i}" class="task-list-btn bg-del">削除</button>`;
			break;
		default:
			console.log("ボタンエラー");
			break;
	}		
}

// 入力されたタスクをHTMLへ書き出す
const taskInsert = (_i) => {
	if (task[_i].viewFlag !== 3) { // 編集モード以外の場合
		taskList.insertAdjacentHTML("beforeend", 
		`<li id="taskItem${_i}" class="task-item">
			${btnMake(_i, 1)}
			<div class="task-content">${task[_i].content}</div>
			${btnMake(_i, 2)}${btnMake(_i, 3)}${btnMake(_i, 4)}
		</li>`);
	} else { // 編集モードの場合（入力欄付き）
		taskList.insertAdjacentHTML("beforeend", 
		`<li id="taskItem${_i}" class="task-item">
			${btnMake(_i, 1)}
			<div class="task-content"><input id="editInput${_i}" class="edit-input" type="text" value="${task[_i].content}"></div>
			${btnMake(_i, 2)}${btnMake(_i, 3)}${btnMake(_i, 4)}
		</li>`);
	}
}

// taskListで使用するボタン要素の取得
const taskListBtnGetElement = (_i) => {
	if (document.getElementById("chkBox" + _i) !== null) {
		aChkBox[_i] = document.getElementById("chkBox" + _i); // チェックボックス
		chkBoxClick(); // チェックボックスがクリックされたときの処理
	}
	if (document.getElementById("editBtn" + _i) !== null) {
		aEdit[_i] = document.getElementById("editBtn" + _i); // 編集ボタン
		editClick(); // 編集ボタンがクリックされたときの処理
	}
	if (document.getElementById("updateBtn" + _i) !== null) {
		aUpdate[_i] = document.getElementById("updateBtn" + _i); // 更新ボタン
		updateClick(); // 更新ボタンがクリックされたときの処理
	}
	if (document.getElementById("editInput" + _i) !== null) {
		aEditInput[_i] = document.getElementById("editInput" + _i); // 編集入力欄
	}
	if (document.getElementById("delBtn" + _i) !== null) {
		aDel[_i] = document.getElementById("delBtn" + _i); // 削除ボタン
		delClick(); // 削除ボタンがクリックされたときの処理
	}
}

// taskListにタスクを表示する
const taskView = () => {
	taskList.textContent = ""; // 表示領域の内容をまず消す
	for (let i = 0; i < task.length; i++) {
		switch (task[i].viewFlag) {
			case 0: // 追加
			case 3: // 編集
			case 4: // 更新
				taskInsert(i); // 入力タスクをHTMLへ書き出す
				taskListBtnGetElement(i); // taskListで使用するボタン要素の取得
				break;
			case 1: // チェックボックス　true
				taskInsert(i); // 入力タスクをHTMLへ書き出す
				document.getElementById("chkBox" + i).checked = true; // チェックボックスにチェックを入れる
				document.getElementById("taskItem" + i).classList.add("task-item-end"); // チェックが入ったタスクは薄く表示
				taskListBtnGetElement(i); // taskListで使用するボタン要素の取得
				break;
			case 2: // チェックボックス　false
				taskInsert(i); // 入力タスクをHTMLへ書き出す
				document.getElementById("chkBox" + i).checked = false; // チェックボックスのチェックを外す
				taskListBtnGetElement(i); // taskListで使用するボタン要素の取得
				break;
			case 5: // 削除
				break;
			default:
				console.log("表示エラー");
				break;
		}
	}
}

// タスク 追加ボタンがクリックされたときの処理
addBtn.addEventListener("click", function() {
	if (addInput.value) {
		taskAccumulate(); // 入力されたタスクごとにインスタンスを生成する
		taskView(); // taskListに表示する
		addInput.value = ""; // 入力欄の内容を削除
		taskCnt++; // タスクの入力ごとにカウントする
	}
});

// チェックボックスがクリックされたときの処理
const chkBoxClick = () => {
	for (let i = 0; i < aChkBox.length; i++) {
		aChkBox[i].addEventListener("click", function() {
			if (document.getElementById("chkBox" + i).checked === true) {					
				task[i].viewFlag = 1; // チェックされた状態
			} else {
				task[i].viewFlag = 2; // チェックが外れた状態
			}
			taskView(); // taskListを再表示する
		});
	}
}

// 編集ボタンがクリックされたときの処理
const editClick = () => {
	for (let i = 0; i < aEdit.length; i++) {
		aEdit[i].addEventListener("click", function() {
			task[i].viewFlag = 3; // 編集モード
			taskView(); // taskListを再表示する
			task[i].editFlag = 1; // 更新可能
		});
	}
}

// 更新ボタンがクリックされたときの処理
const updateClick = () => {
	for (let i = 0; i < aUpdate.length; i++) {
		aUpdate[i].addEventListener("click", function() {
			if (task[i].editFlag === 1 && aEditInput[i].value !== "") { // 
				task[i].viewFlag = 4; // 更新モード
				task[i].content = escapeSpecialChars(aEditInput[i].value); // 更新された内容をエスケープして格納
				taskView(); // taskListを再表示する
				task[i].editFlag = 0; // 更新できない状態に戻す
			}
		});
	}
}

// 削除ボタンがクリックされたときの処理
const delClick = () => {
	for (let i = 0; i < aDel.length; i++) {
		aDel[i].addEventListener("click", function() {
			if (confirm("本当に削除しますか？")) {
				task[i].viewFlag = 5; // 削除モード
				taskView(); // taskListを再表示する
			}
		});
	}
}


} // ブロックスコープ(END)
