'use strict';

const InputText = () => {
  return (
    <div>
      <input type="text" defaultValue="" onChange={event => console.log(event.target.value)} />
    </div>
  )
}
ReactDOM.render(
  <InputText />,
  document.getElementById('root')
);

const InputText2 = () => {
  // コールバック関数
  const handleInput= (event) => {
    // イベントハンドラを書く
    console.log(event.target.value)
  }
  return (
    <div>
      <input type="text" defaultValue="" onChange={handleInput}/>
    </div>
  )
}
ReactDOM.render(
  <InputText2 />,
  document.getElementById('root2')
);