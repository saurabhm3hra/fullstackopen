import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const headerText = "give feedback";
  const handleClick = (buttonText) => {
    switch (buttonText) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
    }
  };

  return (
    <div>
      <Header header={headerText} />
      <span>
        <Button buttonText="good" handleClick={handleClick} />
        <Button buttonText="neutral" handleClick={handleClick} />
        <Button buttonText="bad" handleClick={handleClick} />
      </span>
      <StatisticsHeader />
      <Statistics data={{ good, neutral, bad }} />
    </div>
  );
};

const Header = ({ header }) => <h1>{header}</h1>;
const Button = ({ buttonText, handleClick }) => (
  <button onClick={() => handleClick(buttonText)}>{buttonText}</button>
);
const StatisticsHeader = () => <h1>statistics</h1>;
const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ data }) => {
  const sum = data.good + data.neutral + data.bad;
  if (sum === 0) {
    return <div>No feedback is given</div>;
  }
  return (
    <div>
      <table>
        <StatisticsLine text="good" value={data.good} />
        <StatisticsLine text="neutral" value={data.neutral} />
        <StatisticsLine text="bad" value={data.bad} />
        <StatisticsLine text="all" value={sum} />
        <StatisticsLine
          text="average"
          value={(data.good * 1 + data.bad * -1) / sum}
        />
        <StatisticsLine text="positive" value={(data.good * 100) / sum} />
      </table>
    </div>
  );
};

export default App;
