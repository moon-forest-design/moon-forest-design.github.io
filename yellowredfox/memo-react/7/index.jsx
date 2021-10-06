'use strict';

function App(props) {
  return <p>Reactテスト：コンポーネントで{props.name}を使う</p>;
}
ReactDOM.render(
  <React.StrictMode>
    <App name="引数Props" />
  </React.StrictMode>,
  document.getElementById('root')
);
