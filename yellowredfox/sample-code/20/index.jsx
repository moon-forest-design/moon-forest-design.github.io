'use strict';

// クラス構文でコンポーネントを作成
class Clock extends React.Component {
  constructor(props) {
    // super(props)は、this.stateを使うために必要
    super(props);
    this.state = {date: new Date()};
  }
  // 現在の日時を取得
  tick() {
    this.setState({
      date: new Date()
    });
  }
  // componentDidMount()は、レンダー直後に実行したい処理を書く
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  // componentWillUnmount()は、componentDidMount()の解除処理を書く
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  // this.propsとthis.stateを調べて、React要素などを返す
  render() {
    return <p>時刻　{this.state.date.toLocaleTimeString()}</p>;
  }

}

ReactDOM.render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>,
  document.getElementById('root')
);
