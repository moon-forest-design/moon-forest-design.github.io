'use strict';

// 関数を中に書く場合の書き方
// const CountUpBtn = () => {
//   // const [状態変数, 状態変更関数] = React.useState(状態の初期値);
//   const [count, setCount] = React.useState(0);
//   return (
//     <button onClick={() => setCount(count + 1)} className='countBtn'>
//       {count}
//     </button>
//   )
// }
// //コンポーネントの描画
// ReactDOM.render(
//   <React.StrictMode>
//     <CountUpBtn />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// 関数を外に書く場合の書き方
const CountUpBtn = () => {
  // const [状態変数, 状態変更関数] = React.useState(状態の初期値);
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);
  return (
    <button onClick={increment} className='countBtn'>
      {count}
    </button>
  );
}
//コンポーネントの描画
ReactDOM.render(
  <React.StrictMode>
    <CountUpBtn />
  </React.StrictMode>,
  document.getElementById('root')
);
