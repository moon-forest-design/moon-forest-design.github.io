'use strict';

// React.memoを使わない場合
const NoMemoChildComponent = ({ txt }) => {
  console.log("rendered", txt);
  return <div className='countTxt'> {txt} </div>;
};

// React.memoを使う場合
const MemoChildComponent = React.memo(({ txt }) => {
  console.log("rendered", txt);
  return <div className='countTxt'> {txt} </div>;
});

const CountUpBtn = () => {
  const text1 = "テキスト1：React.memoを使わない場合";
  const text2 = "テキスト2：React.memoを使う場合";
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);
  return (
    <div>
      <NoMemoChildComponent txt={text1} />
      <button onClick={increment} className='countBtn'>
        ＋{count}
      </button>
      <MemoChildComponent txt={text2} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <CountUpBtn />
  </React.StrictMode>,
  document.getElementById('root')
);
