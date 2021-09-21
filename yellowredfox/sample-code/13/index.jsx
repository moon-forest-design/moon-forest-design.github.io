'use strict';

// 摂氏・華氏を判別するための略称　c or f
const scaleNames = {
  c: '摂氏（Celsius）',
  f: '華氏（Fahrenheit）'
};
// 摂氏（Celsius）へ変換する計算式
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
// 華氏（Fahrenheit）へ変換する計算式
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
// 摂氏・華氏の変換
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
// 入力された値に応じてテキストを表示
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>結果：水は沸騰する（The water would boil.）</p>;
  }
  return <p>結果：水は沸騰しない（The water would not boil.）</p>;
}
// 温度（temperature）を入力するための仕組み
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  // 入力処理
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
  // 入力欄の再描画
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>{scaleNames[scale]} で温度を入力</legend>
        <input value={temperature}
              onChange={this.handleChange} />
      </fieldset>
    );
  }
}
// 本体
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }
  // 摂氏（Celsius）の状態を変更
  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }
  // 華氏（Fahrenheit）の状態を変更
  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }
  // 再描画
  render() {
    const scale = this.state.scale; // 換算尺度　c or f
    const temperature = this.state.temperature; // 温度
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);
