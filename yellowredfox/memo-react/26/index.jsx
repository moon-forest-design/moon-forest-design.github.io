'use strict';

function DataView() {
  return (
    <React.Fragment>
      <td>データA</td>
      <td>データB</td>
      <td>データC</td>
    </React.Fragment>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <table>
      <tr>
        <th>見出しA</th>
        <th>見出しB</th>
        <th>見出しC</th>
      </tr>
      <tr><DataView /></tr>
    </table>
  </React.StrictMode>,
  document.getElementById('root')
);
