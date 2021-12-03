'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this !';
    }

    return (
      <button onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    );
  }
}

const reactRender = () => ReactDOM.render(
  <React.StrictMode>
    <LikeButton />
  </React.StrictMode>,
  document.getElementById('root')
);
reactRender();
