import React, { useState } from 'react';
import { ButtonOnClick } from './button-on-click';

export const TableRow = (props: { title: string; statistic: string }) => {
  const { title, statistic } = props;
  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{statistic}</td>
      </tr>
    </>
  );
};

export const Stats = (props: {
  good: number;
  neutral: number;
  bad: number;
}) => {
  const { good, neutral, bad } = props;
  const total_entries = good + neutral + bad;
  const average = (good + bad * -1) / total_entries;
  const positive = good / total_entries;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Stats</th>
          </tr>
        </thead>

        <tbody>
          <TableRow title={'good'} statistic={`${good}`} />
          <TableRow title={'neutral'} statistic={`${neutral}`} />
          <TableRow title={'bad'} statistic={`${bad}`} />
          <TableRow title={'average'} statistic={average.toFixed(2)} />
          <TableRow
            title={'positive'}
            statistic={(positive * 100).toFixed(2)}
          />
        </tbody>
      </table>
    </>
  );
};

export const Feedback = () => {
  const [feeling, set_feeling] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const i_felt =
    (felt: string, feeling_state: Record<string, number>) => () => {
      return set_feeling({ ...feeling_state, [felt]: feeling_state[felt] + 1 });
    };

  return (
    <>
      <Stats good={feeling.good} neutral={feeling.neutral} bad={feeling.bad} />
      <ButtonOnClick fn={i_felt('good', feeling)} text="Good" />
      <ButtonOnClick fn={i_felt('neutral', feeling)} text="Neutral" />
      <ButtonOnClick fn={i_felt('bad', feeling)} text="Bad" />
    </>
  );
};
