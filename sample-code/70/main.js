'use strict';

// 「Reactハンズオンラーニング 第2版 ―Webアプリケーション開発のベストプラクティス」P58
// 関数の合成（関数型プログラミング的アプローチ）

// ページが表示された時刻を生成
const createClockTime = date => ({date});

// 午前か午後か評価し、情報を付加（例：16時なら PMが入る）
const appendAMPM = ({date}) =>
  ({
      date,
      ampm: (date.getHours() >= 12) ? "PM" : "AM"
  });

// 24時間制を12時間制表記へ変換
const civilianHours = clockTime => {
  const hours = clockTime.date.getHours();
  return {
    ...clockTime,
    hours: (hours > 12) ?
      hours - 12 :
      hours
  };
};

// 不要になったプロパティを削除し、必要なプロパティのみ返す
const removeDate = clockTime => {
  let newTime = {...clockTime};
  delete newTime.date;
  return newTime;
};

// 高階関数を使った関数の合成を行う。reduce()で各関数をひとつずつ実行して集約していく
const compose = (...fns) =>
  (arg) => fns.reduce((composed, f) => f(composed), arg);


// 関数composeに関数を引数として渡し、oneFunctionへ代入
const oneFunction = compose(
  createClockTime,
  appendAMPM,
  civilianHours,
  removeDate
);

// 関数群が入っている oneFunctionに、引数「new Date()」を渡して実行した結果がコンソール表示される
console.log(oneFunction(new Date()));
