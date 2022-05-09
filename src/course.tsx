import React from 'react';
import { IPart, TPartList, ICourse } from './course-data';

const MakePartLi = (props: { parts: TPartList }) => {
  return (
    <>
      {props.parts.map((part: IPart) => (
        <li key={part.id}>
          name: {part.name} exercises: {part.exercises}
        </li>
      ))}
    </>
  );
};

export const Course = (props: { course: ICourse }) => {
  return (
    <>
      <header>header</header>
      <div id="content">content</div>
      <MakePartLi parts={props.course.parts} />
    </>
  );
};
