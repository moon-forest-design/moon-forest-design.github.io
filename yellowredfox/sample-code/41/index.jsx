'use strict';

const TodoApp = () => {
  const [text, inputText] = React.useState(''); // text：入力欄に表示する文字列tmp
  const [items, itemsStock] = React.useState([]); // items：入力された内容をストックする配列

  // Todoリストの表示
  const TodoList = () => {
    // key属性は各項目を識別するために使う
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  };

  // 入力欄に入力されたときの処理
  const handleChange = (e) => {
    inputText(e.target.value);
  };

  // submitボタンが押されたときの処理
  const handleSubmit = (e) => {
    e.preventDefault();

    // 何も入力されていなければ、何もせず return
    if (text.length === 0) {
      return;
    }

    // 入力された内容を格納　idとしてUNIX時間を利用
    const newItem = {
      text: text,
      id: Date.now(),
    };

    // TodoリストitemsとnewItemを結合し、itemsの状態を更新
    itemsStock(items.concat(newItem));

    // 入力欄を空にする
    inputText("");

  };

  return (
    <div>
      <h3>TODO</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">
          やること
        </label>
        <input
          id="new-todo"
          onChange={handleChange}
          value={text}
        />
        <button>
          Add #{items.length + 1}
        </button>
      </form>
      <TodoList />
    </div>
  );

}

const reactRender = () => ReactDOM.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
  document.getElementById('root')
);
reactRender();
