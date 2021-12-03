'use strict';

function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar({name, avatarUrl}) {
  return (
    <img
      className="Avatar"
      src={avatarUrl}
      alt={name}
    />
  );
}

function UserInfo({name, avatarUrl}) {
  return (
    <div className="UserInfo">
      <Avatar name={name} avatarUrl={avatarUrl} />
      <div className="UserInfo-name">{name}</div>
    </div>
  );
}

function Comment({date, text, author}) {
  return (
    <div className="Comment">
      <UserInfo name={author.name} avatarUrl={author.avatarUrl} />
      <div className="Comment-text">{text}</div>
      <div className="Comment-date">
        {formatDate(date)}
      </div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'yellowredfox',
    avatarUrl: 'logo-yellowredfox.png',
  },
};

const reactRender = () => ReactDOM.render(
  <React.StrictMode>
    <Comment
      date={comment.date}
      text={comment.text}
      author={comment.author}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
reactRender();
