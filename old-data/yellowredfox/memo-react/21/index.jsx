'use strict';

class Timer extends React.Component {
  constructor(props) {
    // super(props)は、this.stateを使うために必要
    super(props);
    // コンポーネント独自の内部状態を定義
    this.state = { seconds: 0 };
  }
  // カウントアップ
  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }
  // componentDidMount()は、レンダー直後に実行したい処理を書く
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  // componentWillUnmount()は、componentDidMount()の解除処理を書く
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  // 状態が変化した場合に render()を再度実行して描画する
  render() {
    return (
      <div>
        {this.state.seconds}
      </div>
    );
  }
}

const reactRender = () => ReactDOM.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
  document.getElementById('root')
);
reactRender();
