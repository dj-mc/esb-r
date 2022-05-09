export interface IPart {
  name: string;
  exercises: number;
  id: number;
}

export type TPartList = IPart[];

export interface ICourse {
  id: number;
  name: string;
  parts: TPartList;
}

export const course_data: ICourse = {
  id: 1,
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    }
  ]
};
