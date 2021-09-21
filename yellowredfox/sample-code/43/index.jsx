'use strict';

// Square　正方形の各マス目
function Square(props) { // onClick()と valueを、propsで受け取る
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// Board　盤面
class Board extends React.Component {
  // renderSquareメソッド　各マス目を描画
  renderSquare(i) {
    return (
      // 関数Squareを呼び出す　「() => this.props.onClick(i)」は bindしている。
      // 他の bind方法「this.handleClick = this.handleClick.bind(this);」としても同じ。
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  // 盤面を描画
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
// ゲーム処理
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null) // 9個のマス目の状態をしめす　fill()ですべてに nullを入れる
        }
      ],
      stepNumber: 0, // 着手数（何手目か？）
      xIsNext: true // 着手者の切替　true：X　or false：O
    };
  }
  // handleClickメソッド　マス目がクリックされたときの処理
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // ？
    const current = history[history.length - 1]; // 現在の historyを代入
    const squares = current.squares.slice(); // 盤面を更新する前に、現在の状態を代入
    console.log(squares);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O"; // trueなら X、falseなら Oを代入
    this.setState({ // 状態の更新
      history: history.concat([ // 過去の履歴と今回の履歴を結合
        {
          squares: squares
        }
      ]),
      stepNumber: history.length, // 着手数を更新
      xIsNext: !this.state.xIsNext // xIsNexの値を反転　交互に着手
    });
  }
  // jumpToメソッド　
  jumpTo(step) {
    this.setState({ // 状態の更新
      stepNumber: step, // 着手数を更新
      xIsNext: (step % 2) === 0 // stepNumberの値が偶数だったら xIsNextを trueにする
    });
  }
  // 
  render() {
    const history = this.state.history; // 着手履歴9回分の配列
    const current = history[this.state.stepNumber]; // 着手履歴9回分のうちの現在選択されている着手
    const winner = calculateWinner(current.squares); // ゲーム勝敗の判定結果

    // map()を使って着手履歴のリストを作成
    // ・step　着手履歴9回分の配列
    // ・move　着手の順番（インデックス）　li要素で keyにも使用
    const moves = history.map((step, move) => {
      const desc = move ? // 0なら'Go to game start'、それ以外なら'Go to move #' + moveをdescに代入
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status; // ゲームの進捗をしめすテキストに使う
    if (winner) { // 勝敗が決まったら勝者をしめすテキストを設定
      status = "Winner: " + winner;
    } else { // 勝敗が決まっていない場合は次の着手者を促すテキストを設定
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    // 盤面と履歴の表示
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById("root")
);
// ゲーム勝敗の判定
function calculateWinner(squares) {
  const lines = [ // 勝ち判定基準　縦・横・斜め
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) { // 勝ち判定基準　確認
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null; // 勝敗がついていない場合は nullを返す
}
