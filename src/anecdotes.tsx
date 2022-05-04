import React, { useState } from 'react';
import { ButtonOnClick } from './button-on-click';

const Vote = (props: {
  current_idx: number;
  current_ballot: Array<number>;
  set_ballot_fn: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const vote_for_current_idx = () => {
    const new_ballot = [...props.current_ballot];
    new_ballot[props.current_idx] += 1;
    props.set_ballot_fn(new_ballot);
  };
  return (
    <>
      <ButtonOnClick fn={() => vote_for_current_idx()} text={'vote'} />
      {props.current_ballot}
    </>
  );
};

export const Anecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of thedevelopment time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const generate_ballot = (list: Array<string>) => {
    return Array(list.length).fill(0);
  };

  const [selected_idx, set_selected_idx] = useState(0);
  const [ballot, set_ballot] = useState(generate_ballot(anecdotes));

  const selector = () => {
    set_selected_idx(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <>
      <Vote
        current_idx={selected_idx}
        current_ballot={ballot}
        set_ballot_fn={set_ballot}
      />
      <ButtonOnClick fn={() => selector()} text={'get anecdote'} />
      {anecdotes[selected_idx]}
    </>
  );
};
