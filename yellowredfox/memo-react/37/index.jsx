'use strict';

const App = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Japan&format=json&origin=*&limit=1";
    fetch(url)
      .then(result => result.json())
      .then(result => setData(result));
  }, []);

  const result = data.map((entry, index) => {
    console.log(entry);
    return <li key={index}>{entry}</li>;
  });
  return <div className="container"><ul>{result}</ul></div>;

}
ReactDOM.render(
  <App />,
  document.getElementById("root")
);
