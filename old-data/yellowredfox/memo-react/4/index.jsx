'use strict';

const colorBlue = { color : 'blue' }; 
const TextView = () => (
  <div>
    <p>CSSを設定する方法 3つ。</p>
    <ul>
      <li style={{ color : 'red' }}>要素に style属性で直書き</li>
      <li style={colorBlue}>一度変数でまとめて、要素に style属性</li>
      <li className="colorGreen">外部ファイル</li>
    </ul>
  </div>
);
ReactDOM.render(
  <React.StrictMode>
    <TextView />
  </React.StrictMode>,
  document.getElementById('root')
);
