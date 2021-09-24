'use strict';

function App() {
  const prefix = "Reactテスト：";
  return (
    <div className="reactText">
      <p style={{ fontWeight: 'bold' }}>「{prefix}JSX」</p>
      <p>JSXを使って書いた。</p>
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
