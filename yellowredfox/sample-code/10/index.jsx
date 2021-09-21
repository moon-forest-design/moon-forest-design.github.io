'use strict';

class CountUpBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
    // bind()は、コールバックで thisを機能させるために必要
    this.incrementCount = this.incrementCount.bind(this);
  }
  incrementCount() {
    // setState()で、コンポーネントの更新を要求する
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <button onClick={this.incrementCount} className='countBtn'>
          {this.state.count}
        </button>
      </div>
    );
  }
}

const render = () => ReactDOM.render(
  <React.StrictMode>
    <CountUpBtn />
  </React.StrictMode>,
  document.getElementById('root')
);
render();
