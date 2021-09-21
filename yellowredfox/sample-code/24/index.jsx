'use strict';

class NumList extends React.Component {
  render() {
    return (
      <div>No. {this.props.num}</div>
    );
  }
}
// PropTypesライブラリによる型チェックに必要な設定　数値であることをチェックしたい
NumList.propTypes = {
  num: PropTypes.number
};
const render = () => ReactDOM.render(
  // 試しにあえて文字列を渡す
  <React.StrictMode>
    <NumList num="Sara" />
  </React.StrictMode>,
  document.getElementById('root')
);
render();
