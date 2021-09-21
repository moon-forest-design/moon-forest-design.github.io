'use strict';

const Toggle = () => {
  // ステートフック
  const [isToggleOn, handleClick] = React.useState(true);
  // ON OFF切り替え（true or false）
  const toggleChange = () => !isToggleOn;
  return (
    <button onClick={() => handleClick(toggleChange)}>
      {isToggleOn ? 'ON' : 'OFF'}
    </button>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <Toggle />
  </React.StrictMode>,
  document.getElementById('root')
);
