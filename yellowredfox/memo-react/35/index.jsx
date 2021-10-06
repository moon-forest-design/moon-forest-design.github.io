'use strict';

const timeNow = () => {
  return new Date().toLocaleTimeString();
};
const Clock = () => {
  // ステートフック
  const [date, setTick] = React.useState(timeNow());
  // 副作用フック
  React.useEffect(() => {
    const timerID = setInterval(
      () => setTick(timeNow()),
      1000
    );
    // クリーンアップ処理
    return () => {
      clearInterval(timerID);
    };
  // 依存関係配列
  }, [date]);

  return (
    <p>時刻　{date}</p>
  );

}

ReactDOM.render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>,
  document.getElementById('root')
);
