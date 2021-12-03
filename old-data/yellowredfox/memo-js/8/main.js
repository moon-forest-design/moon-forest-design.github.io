"use strict";

// デジタル時計（関数型プログラミング的アプローチ）

const oneSecond = () => 1000; // わざわざ関数化するメリットって何だろう？
const getCurrentTime = () => new Date(); // Dateオブジェクトでインスタンスを生成した関数
const clear = () => console.clear(); // コンソールをクリアすることで1行表示になる
const log = message => console.log(message); // コンソール表示する関数

// Dateオブジェクトから時分秒の値を抽出し、時間オブジェクトに変換
const abstractClockTime = date =>
    ({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    });

// 時間オブジェクトを12時間制に変換
const civilianHours = clockTime =>
    ({
        ...clockTime,
        hours: (clockTime.hours > 12) ?
          clockTime.hours - 12 :
          clockTime.hours
    });

// 時間オブジェクトに、午前ならAM、午後ならPMを付加
const appendAMPM = clockTime =>
    ({
        ...clockTime,
        ampm: (clockTime.hours >= 12) ? "PM" : "AM"
    });

// 関数targetを引数として取り、その関数を使って時刻を表示する関数を戻り値として返す
// 「message => console.log(message);」を渡しているのかな？
const display = target => time => target(time);

// 時刻を表示するひな形に実際の数値を入れた関数を返す
const formatClock = format =>
    time =>
        format.replace("hh", time.hours)
            .replace("mm", time.minutes)
            .replace("ss", time.seconds)
            .replace("tt", time.ampm);

// 値が一桁の場合は 0を付加して関数を戻り値として返す
const prependZero = key => clockTime =>
    ({
        ...clockTime,
        [key]: (clockTime[key] < 10) ?
            "0" + clockTime[key] :
            clockTime[key]
    });

// 高階関数を使った関数の合成を行う。reduce()で各関数をひとつずつ実行して集約していく
const compose = (...fns) =>
    (arg) =>
        fns.reduce(
            (composed, f) => f(composed),
            arg
        );

// 関数appendAMPMとcivilianHoursを合成してできた関数を用いて時間のオブジェクトを午前 / 午後の形式に変換
const convertToCivilianTime = clockTime =>
    compose(
        appendAMPM,
        civilianHours
    )(clockTime);

// 関数prependZeroを合成してできた関数を用いてオブジェクト中の時分秒の前にゼロを付加
const doubleDigits = civilianTime =>
    compose(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime);

// 最上位の関数。すべての関数を合成してできた関数をsetIntervalにセットすることで1秒おきに呼び出される
const startTicking = () =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            abstractClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    );

startTicking();
