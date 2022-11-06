# esb-r

This is the frontend part of [fso](https://github.com/dj-mc/fso).

Use esbuild + typescript to render react's jsx sugar instead of using
[CRA](https://create-react-app.dev/), webpack, babel, etc. to compile it. I
wanted to learn typescript but the course doesn't cover it until much later,
and so I've used esbuild to compile that too. Tools like webpack and typescript
will be covered later.

`./node_modules/.bin/esbuild --version`

Factor out and make pages for these:

```tsx
// import { Phonebook } from './phonebook/phonebook';

// import { Courses } from './course';
// import { course_data } from './course-data';
// import { Countries } from './countries';
// import LikeButton from './like-button';

// import { Anecdotes } from './anecdotes';
// import { StatefulComponent } from './stateful';
// import { Counter, StatefulCounter } from './counter';
// import { Feedback } from './feedback';

/* <h2>{title}</h2> */
/* <Greet {...greet_options} /> */
/* <Anecdotes /> */
/* <StatefulComponent /> */
/* <Feedback /> */
/* <Counter n={init_count} /> */
/* <StatefulCounter /> */
/* <LikeButton /> */
/* <Phonebook /> */
/* <Countries /> */
/* <Courses courses={course_data} /> */
```
