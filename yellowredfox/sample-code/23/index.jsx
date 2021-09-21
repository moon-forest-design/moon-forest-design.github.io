'use strict';

const ListItem = ({work, name}) => {
  // 正しい書き方：関数で書く場合は、この li要素に key属性をつけないらしい
  return <li>{work} : {name}</li>;
};

const MemberList = (props) => {
  const members = props.members;
  const listItems = members.map((member) =>
    // 正しい書き方：関数を呼び出すときに key属性をつけるだけでいいらしい
    <ListItem key={member.id.toString()}
              work={member.work}
              name={member.name}
    />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
};

const members = [
  { id: 1, name: 'Rabbit', work: 'Web Director' },
  { id: 2, name: 'Cat', work: 'Web Designer' },
  { id: 3, name: 'Fox', work: 'Web Programmer' },
  { id: 4, name: 'Raccoon dog', work: 'Markup Engineer' },
];
ReactDOM.render(
  <React.StrictMode>
    <MemberList members={members} />
  </React.StrictMode>,
  document.getElementById('root')
);
