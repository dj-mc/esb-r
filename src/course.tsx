import React from 'react';
import { IPart, TPartList, ICourse, TCourseList } from './course-data';

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

const SumExercises = (props: { parts: TPartList }) => {
  const total = props.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return <>{total}</>;
};

const Course = (props: { course: ICourse }) => {
  return (
    <>
      <header>Header</header>
      <div id="content">Content</div>
      <MakePartLi parts={props.course.parts} />
      Sum: <SumExercises parts={props.course.parts} />
    </>
  );
};

export const Courses = (props: { courses: TCourseList }) => {
  return (
    <>
      {props.courses.map((course: ICourse) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};
