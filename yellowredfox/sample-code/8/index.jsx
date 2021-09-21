'use strict';

const Hello = ({ name, color }) => (
  <div>
    <p style={{ color }}>Hello {name}</p>
  </div>
);
const TextView = () => (
  <div>
    <Hello name="Rabbit" color="red" />
    <Hello name="Cat" color="blue" />
    <Hello name="Raccoon dog" color="green" />
  </div>
);
ReactDOM.render(
  <React.StrictMode>
    <TextView />
  </React.StrictMode>,
  document.getElementById('root')
);
