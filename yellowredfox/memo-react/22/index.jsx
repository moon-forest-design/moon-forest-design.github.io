'use strict';

const members = [
  { name: 'Rabbit', work: 'Web Director' },
  { name: 'Cat', work: 'Web Designer' },
  { name: 'Fox', work: 'Web Programmer' },
  { name: 'Raccoon dog', work: 'Markup Engineer' },
];
const MemberList = ({ name, work }) => (
  <li>{work} : {name}</li>
);
const TextView = () => (
  <ul>
    {members.map((member) => (
      <MemberList name={member.name} work={member.work} />
    ))}
  </ul>
);
ReactDOM.render(
  <React.StrictMode>
    <TextView />
  </React.StrictMode>,
  document.getElementById('root')
);
