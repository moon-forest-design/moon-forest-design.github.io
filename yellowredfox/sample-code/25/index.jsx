'use strict';

class ChildComponent extends React.Component {
  render() {
    return (
      <div>
        <p>子：{this.props.name} 一郎</p>
      </div>
    )
  }
};
class ParentComponent extends React.Component {
  render() {
    return (
      <div>
        <p>親：{this.props.name} 太郎</p>
        <ChildComponent name={this.props.name} />
      </div>
    )
  }
};
//コンポーネントの描画
ReactDOM.render(
  <ParentComponent name='山田' />,
  document.getElementById('root')
);
