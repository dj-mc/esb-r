import React from 'react';
import { IPart, TPartList, ICourse } from './course-data';

const MakePartLi = (props: { parts: TPartList }) => {
  return (
    <>
      {props.parts.map((part: IPart) => (
        <li key={part.id}>
          Name: {part.name} Exercises: {part.exercises}
        </li>
      ))}
    </>
  );
};

const SumOfExercises = (props: { parts: TPartList }) => {
  let sum_of_exercises = 0;
  for (const p of props.parts) {
    sum_of_exercises += p.exercises;
  }
  return <>{sum_of_exercises}</>;
};

export const Course = (props: { course: ICourse }) => {
  return (
    <>
      <header>Header</header>
      <div id="content">Content</div>
      <MakePartLi parts={props.course.parts} />
      Sum: <SumOfExercises parts={props.course.parts} />
    </>
  );
};
