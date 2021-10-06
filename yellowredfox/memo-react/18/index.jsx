'use strict';

const style = {
  width: '100%',
  padding: '1em',
  boxSizing: 'border-box',
};
let textData = '';
const setTextData = (event) => {
  textData = event.target.value; // 入力された値を格納
  if (textData.length > 10) {
    textData = textData.slice(0, 10); // 10文字を越えたら10文字までに切り整える
  }
  render(); // 入力されるたびに再描画する
};
const InputForm = () => (
  // value属性　入力された値を表示　初期値は空''
  // onChange属性　入力イベントが発生したら関数setTextDataを起動
  <div style={style}>
    <input type="text" value={textData} onChange={setTextData} style={style} />
  </div>
);
const render = () => ReactDOM.render(
  <React.StrictMode>
    <InputForm />
  </React.StrictMode>,
  document.getElementById('root')
);
render();
