'use strict';

const LikeButton = () => {
  const [liked, clickLiked] = React.useState(false);

  if (liked) {
    return 'You liked this !';
  }

  return (
    <button onClick={() => clickLiked(true)}>
      Like
    </button>
  );

};

const reactRender = () => ReactDOM.render(
  <React.StrictMode>
    <LikeButton />
  </React.StrictMode>,
  document.getElementById('root')
);
reactRender();
