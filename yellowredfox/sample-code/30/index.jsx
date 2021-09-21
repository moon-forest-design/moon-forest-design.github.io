'use strict';

// ログアウトボタンの表示
const LogoutButton = (props) => {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
};
// ログインボタンの表示
const LoginButton = (props) => {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
};
// メッセージテキストの表示
const Greeting = (props) => {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h3>Welcome back!</h3>;
  }
  return <h3>Please sign up.</h3>;
}
// ログイン・ログアウトボタンの操作
const LoginControl = () => {
  const [isLoggedIn, setLogging] = React.useState(false);
  let button;

  if (isLoggedIn) {
    button = <LogoutButton onClick={() => setLogging(false)} />;
  } else {
    button = <LoginButton onClick={() => setLogging(true)} />;
  }

  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      {button}
    </div>
  );

};
// ReactDOM.render
const reactRender = () => ReactDOM.render(
  <React.StrictMode>
    <LoginControl />
  </React.StrictMode>,
  document.getElementById('root')
);
reactRender();
