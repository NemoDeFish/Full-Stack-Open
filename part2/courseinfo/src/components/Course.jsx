const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => part.exercises + sum, 0)
    return (
      <h4>
        total of {total} exercises
      </h4>
    )
  }

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part part={part} key={part.id} />)} 
  </>

const Header = ({ course }) => <h2>{course}</h2>

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course