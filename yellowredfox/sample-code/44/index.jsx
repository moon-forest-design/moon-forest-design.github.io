'use strict';

// table要素の見出し
const TableHeader = () => { 
  return (
      <thead>
          <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Remove</th>
          </tr>
      </thead>
  );
}

// table要素のデータ
const TableBody = props => { 
  const rows = props.characterData.map((row, index) => {
      return (
          <tr key={index}>
              <td>{row.name}</td>
              <td>{row.job}</td>
              <td><button onClick={() => props.removeCharacter(index)}>Delete</button></td>
          </tr>
      );
  });
  return <tbody>{rows}</tbody>;
}

// table要素：関数TableHeaderと関数TableBodyを呼び出す
const Table = (props) => {
  const { characterData, removeCharacter } = props; // 名前と職業のデータと削除ボタンの情報を分割代入
  return (
      <table>
          <TableHeader />
          <TableBody characterData={characterData} removeCharacter={removeCharacter} />
      </table>
  );
}

// form要素　
class Form extends React.Component {
  constructor(props) {
      super(props);
      
      this.initialState = {
          name: '',
          job: ''
      };

      this.state = this.initialState;
  }

  // handleChangeメソッド　入力欄ハンドラ　名前と職業
  handleChange = event => {
      const { name, value } = event.target;

      this.setState({
          [name] : value
      });
  }

  // onFormSubmitメソッド　form要素submitハンドラ
  onFormSubmit = (event) => {
      event.preventDefault();
      
      this.props.handleSubmit(this.state);
      this.setState(this.initialState);
  }

  render() {
      const { name, job } = this.state; 

      return (
          <form onSubmit={this.onFormSubmit}>
              <label for="name">Name</label>
              <input 
                  type="text" 
                  name="name" 
                  id="name"
                  value={name} 
                  onChange={this.handleChange} />
              <label for="job">Job</label>
              <input 
                  type="text" 
                  name="job" 
                  id="job"
                  value={job} 
                  onChange={this.handleChange} />
              <button type="submit">
                  Submit
              </button>
          </form>
      );
  }
}

// アプリ本体：クラスTableとクラスFormを呼び出す
class App extends React.Component {
  state = {
      characters: []
  };

  removeCharacter = index => {
      const { characters } = this.state;
  
      this.setState({
          characters: characters.filter((character, i) => { 
              return i !== index;
          })
      });
  }

  handleSubmit = character => {
      this.setState({characters: [...this.state.characters, character]});
  }

  render() {
      const { characters } = this.state;
      
      return (
          <div className="container">
              <h3>React Tutorial：「名前と職業リスト」</h3>
              <p>Add a character with a name and a job to the table.</p>
              <Table
                  characterData={characters}
                  removeCharacter={this.removeCharacter}
              />
              <h4>Add New</h4>
              <Form handleSubmit={this.handleSubmit} />
          </div>
      );
  }
}

// React描画
ReactDOM.render(
<App />,
document.getElementById("root")
);
