'use strict';

// 1　関数 functionを使い、仮引数を propsで受け取る方法
function Component1( props ) {
  return (
    <div>コンポーネント1： {props.way}</div>
  );
}

// 2　アロー関数を使い、仮引数を propsで受け取る方法
const Component2 = ( props ) => (
  <div>コンポーネント2： {props.way}</div>
);

// 3　アロー関数を使い、仮引数を propsで受け取る方法（returnあり）
const Component3 = ( props ) => {
  // ※：ここに何かしらの処理が入る場合にreturnが必要になる
  return (
    <div>コンポーネント3： {props.way}</div>
  );
};

// 4　関数 functionを使い、仮引数を分割代入で受け取る方法
function Component4({ way }) {
  return (
    <div>コンポーネント4： {way}</div>
  );
}

// 5　アロー関数を使い、仮引数を分割代入で受け取る方法
const Component5 = ({ way }) => (
  <div>コンポーネント5： {way}</div>
);

// 6　class構文を使い、引数は this.props.***で受け取る方法
class Component6 extends React.Component {
  render() {
    return (
      <div>コンポーネント6： {this.props.way}</div>
    );
  }
}

// 7　React.createClass()を使う方法　※：React 15.5で廃止になった
// var Component7 = React.createClass({
//   render: function() {
//     return (
//       <div>コンポーネント7： {this.props.way}</div>
//     );
//   }
// });

const render = () => ReactDOM.render(
  <React.StrictMode>
    <Component1 way="関数 functionを使い、仮引数を propsで受け取る方法" />
    <Component2 way="アロー関数を使い、仮引数を propsで受け取る方法" />
    <Component3 way="アロー関数を使い、仮引数を propsで受け取る方法（returnあり）" />
    <Component4 way="関数 functionを使い、仮引数を分割代入で受け取る方法" />
    <Component5 way="アロー関数を使い、仮引数を分割代入で受け取る方法" />
    <Component6 way="class構文を使い、引数は this.props.***で受け取る方法" />
    { /* <Component7 way="React.createClass()を使う方法" /> */ }
  </React.StrictMode>,
  document.getElementById('root')
);
render();
