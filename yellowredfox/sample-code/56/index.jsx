'use strict';

// 摂氏・華氏を判別するための略称　c or f
const scaleNames = {
  c: '摂氏（Celsius）',
  f: '華氏（Fahrenheit）'
};

// 摂氏（Celsius）へ変換する計算式
const toCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;

// 華氏（Fahrenheit）へ変換する計算式
const toFahrenheit = (celsius) => (celsius * 9 / 5) + 32;

// 摂氏・華氏の変換
const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};

// 入力された値に応じてテキストを表示
const BoilingVerdict = (props) => {
  return props.celsius >= 100 ?
    <p>結果：水は沸騰する（The water would boil.）</p> :
    <p>結果：水は沸騰しない（The water would not boil.）</p>;
};

// 温度（temperature）を入力するための仕組み
const TemperatureInput = (props) => {
  // 入力処理
  const handleChange = (e) => props.onTemperatureChange(e.target.value);

  // 入力欄の再描画
  const temperature = props.temperature;
  const scale = props.scale;
  return (
    <fieldset>
      <legend>{scaleNames[scale]} で温度を入力</legend>
      <input value={temperature}
            onChange={handleChange} />
    </fieldset>
  );
};

// 本体
const Calculator = () => {
  const [temperature, setTemperature] = React.useState(''); // 温度
  const [scale, setScale] = React.useState('c'); // 換算尺度　c or f

  // 摂氏（Celsius）の状態を変更
  const handleCelsiusChange = (temperature) => {
    setScale('c');
    setTemperature(temperature);
  };

  // 華氏（Fahrenheit）の状態を変更
  const handleFahrenheitChange = (temperature) => {
    setScale('f');
    setTemperature(temperature);
  };

  // 再描画
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange} />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange} />
      <BoilingVerdict
        celsius={parseFloat(celsius)} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);
