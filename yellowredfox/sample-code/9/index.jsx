'use strict';

// fancy：事前に明確な決まりがない
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
// <FancyBorder>～</FancyBorder>内の要素を引数として渡している
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h3 className="Dialog-title">
        Welcome
      </h3>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <WelcomeDialog />
  </React.StrictMode>,
  document.getElementById('root')
);
