'use strict';

const NameForm = () => {
  const [value, setvalue] = React.useState("");

  const handleChange = (event) => {
    setvalue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('A name was submitted: ' + value);
    setvalue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">名前：</label>
      <input id="name" type="text" value={value} onChange={handleChange} />
      <input type="submit" value="送信（テスト）" />
    </form>
  );

};
ReactDOM.render(
  <React.StrictMode>
    <NameForm />
  </React.StrictMode>,
  document.getElementById('root')
);
