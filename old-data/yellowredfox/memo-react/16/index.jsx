'use strict';

function Form() {
  function handleSubmit(e) {
    // button要素をクリックしたことで発生するデフォルト処理を抑止
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>,
  document.getElementById('root')
);
