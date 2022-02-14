const Course = ({ courses }) => {
    const renderedCourses = courses.map((course) => (
      <div key={course.name}>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ));
  
    return renderedCourses;
  };
  
  const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
  };
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((val) => (
          <Part key={val.id} part={val} />
        ))}
      </div>
    );
  };
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };
  
  const Total = ({ parts }) => {
    return (
      <p>
        <b>total of {parts.reduce((sum, val) => (sum += val.exercises), 0)} exercises</b>
      </p>
    );
  };

  export default Course;