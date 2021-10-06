'use strict';

class App extends React.Component {
  state = {
    data: []
  };
  // ライフサイクルメソッド componentDidMount()
  componentDidMount() {
    const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Japan&format=json&origin=*&limit=1";
    // fetch使用
    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          data: result
      })
    });
  }

  render() {
    const { data } = this.state;

    const result = data.map((entry, index) => {
      console.log(entry);
      return <li key={index}>{entry}</li>;
    });

    return <div className="container"><ul>{result}</ul></div>;
  }
}
ReactDOM.render(
  <App />,
  document.getElementById("root")
);
