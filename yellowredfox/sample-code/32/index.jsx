'use strict';

const CountUpBtn = () => {
  // const [ 状態変数, 状態変更関数 ] = React.useState( 状態の初期値 );
  const [count, setCount] = React.useState(0);
  // React.useEffect( コールバック関数 [, 依存関係配列 ] );
  React.useEffect(() => {
    // クリックのたびにページタイトルを更新する
    document.title = `You clicked ${count} times`;
  // 依存関係配列
  }, [count]);
  return (
    <button onClick={() => setCount(count + 1)} className='countBtn'>
      {count}
    </button>
  )
}
//コンポーネントの描画
ReactDOM.render(
  <React.StrictMode>
    <CountUpBtn />
  </React.StrictMode>,
  document.getElementById('root')
);
