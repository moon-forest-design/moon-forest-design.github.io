'use strict';

class LifeCycleMethod extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    /*
      ・Mounting期間内の render()直後におこないたい処理を書く。
      ・準備段階の処理を書くとよい。例えば、変数の初期化や、Fetch APIのデータ取得、setInterval()など。
    */
  }
  shouldComponentUpdate() {
    /*
      ・Updating期間内の render()直前におこないたい処理を書く。
      ・コンポーネントを再レンダリングすべきか否かを制御できる。
    */
  }
  componentDidUpdate() {
    /*
      ・Updating期間内の render()直後におこないたい処理を書く。
    */
  }
  componentWillUnmount() {
    /*
      ・Unmounting期間内におこないたい処理を書く。
      ・一度クリアしたい処理を書くとよい。例えば、Fetch APIのリクエストのキャンセル、clearInterval()など。
    */
  }
  render() {
    return (
      <div>
        <p>ライフサイクルメソッドの説明をコード内に書いたよ。</p>
      </div>
    )
  }
};
//コンポーネントの描画
ReactDOM.render(
  <LifeCycleMethod />,
  document.getElementById('root')
);
