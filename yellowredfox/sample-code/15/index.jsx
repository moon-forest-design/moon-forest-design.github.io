'use strict';

// onClick属性内に直接処理を書いた場合のサンプル
const ClickBtn = () => {
  return (
    <div>
      <button onClick={() => console.log('clicked 1')}>Click me!</button>
    </div>
  )
}
ReactDOM.render(
  <ClickBtn />,
  document.getElementById('root')
);

// onClick属性内に処理を書かずに、コールバック関数として外に書いた場合のサンプル
const ClickBtn2 = () => {
  // コールバック関数
  const handleBtn= () => {
    // イベントハンドラを書く
    console.log('clicked 2')
  }
  return (
    <div>
      <button onClick={handleBtn}>Click me!</button>
    </div>
  )
}
ReactDOM.render(
  <ClickBtn2 />,
  document.getElementById('root2')
);
