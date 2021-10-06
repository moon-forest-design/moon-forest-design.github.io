'use strict';

const Timer = () => {
  // ステートフック
  const [seconds, setTick] = React.useState(0);
  // 副作用フック
  React.useEffect(() => {
    const timerID = setInterval(
      () => setTick(seconds + 1),
      1000
    );
    // クリーンアップ処理
    return () => {
      clearInterval(timerID);
    };
  // 依存関係配列
  }, [seconds]);

  return (
    <p>{seconds}</p>
  );

};

ReactDOM.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
  document.getElementById('root')
);
