import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
  const HEADER_TEXT = "Anecdote of the day";
  const HEADER_TEXT_VOTES = "Anecdote with most votes";
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});
  
  const handleClick = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVoteClick = () => {
    let newVotes = {...votes};
    if (newVotes.hasOwnProperty(selected)) {
      newVotes[selected] = newVotes[selected] + 1;
      setVotes(newVotes);
    } else {
      newVotes[selected] = 1;
      setVotes(newVotes);
    }
  };

  return (
    <div>
      <Header text={HEADER_TEXT} />
      {anecdotes[selected]}
      <br />
      <Button text="vote" handleClick={handleVoteClick}/>
      <Button text="next anecdote" handleClick={handleClick}/>
      <Header text={HEADER_TEXT_VOTES} />
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  );
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>;
const Header = ({text}) => <h1>{text}</h1>;
const MostVoted = ({anecdotes, votes}) => {
  const maxVal = Object.values(votes).sort((a, b) => b - a)[0];
  if (maxVal === undefined) {
    return <div></div>;
  }
  let mostVoted = 0;
  Object.keys(votes).forEach(key => {
    if(votes[key] === maxVal) {
      mostVoted = key;
    }
  });

  return <div>{anecdotes[mostVoted]}</div>;
};

export default App