'use strict';

function TextView() {
  return <p>Reactテスト：関数コンポーネントを使って表示</p>;
}
ReactDOM.render(
  <React.StrictMode>
    <TextView />
  </React.StrictMode>,
  document.getElementById('root')
);
