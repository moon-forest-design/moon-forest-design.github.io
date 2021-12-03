'use strict';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    // items：入力された内容をストックする配列
    // text：入力欄に表示する文字列tmp
    this.state = { items: [], text: '' };
    // ()を末尾に付けずにメソッドを参照する場合は、そのメソッドは bind()しておく必要がある
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // 状態が変化した場合に render()を再度実行して描画する
  render() {
    return (
      <div>
        <h3>TODO</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            やること
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <TodoList items={this.state.items} />
      </div>
    );
  }
  // 入力欄に入力されたときの処理
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  // submitボタンが押されたときの処理
  handleSubmit(e) {
    e.preventDefault();
    // 何も入力されていなければ、何もせず return
    if (this.state.text.length === 0) {
      return;
    }
    // 入力された内容を格納　idとしてUNIX時間を利用
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    // TodoリストitemsとnewItemを結合し、入力欄を空にする
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}
// Todoリストの表示
class TodoList extends React.Component {
  render() {
    // key属性は各項目を識別するために使う
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

const reactRender = () => ReactDOM.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
  document.getElementById('root')
);
reactRender();
