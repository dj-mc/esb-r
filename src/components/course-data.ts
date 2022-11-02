interface IPart {
  id: number;
  name: string;
  exercises: number;
}

type TPartList = IPart[];

interface ICourse {
  id: number;
  name: string;
  parts: TPartList;
}

type TCourseList = ICourse[];

const course_data: TCourseList = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      },
      {
        id: 4,
        name: 'Redux',
        exercises: 11
      }
    ]
  },
  {
    id: 2,
    name: 'Node.js',
    parts: [
      {
        id: 1,
        name: 'Routing',
        exercises: 3
      },
      {
        id: 2,
        name: 'Middlewares',
        exercises: 7
      }
    ]
  }
];

export { IPart, TPartList, ICourse, TCourseList, course_data };
