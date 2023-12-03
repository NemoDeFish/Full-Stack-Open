import CoursePart from "../types";

interface PartProps {
  part: CoursePart;
}

// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

// Cleaner code, write everything in one line without having to
// declare a separate interface and use props.part every single time:
// const Part = ({ part }: { part: CoursePart }) => {
const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <>
          <br />
          <em>{props.part.description}</em>
        </>
      );
    case "group":
      return (
        <>
          <br />
          project exercises {props.part.groupProjectCount}
        </>
      );
    case "background":
      return (
        <>
          <br />
          <em>{props.part.description}</em>
          <br />
          submit to {props.part.backgroundMaterial}
        </>
      );
    case "special":
      return (
        <>
          <br />
          <em>{props.part.description}</em>
          <br />
          required skills: {...props.part.requirements}
        </>
      );
    // Should have default:
    // default:
    //   return assertNever(part);
  }

  // Intead of returning from the switch statement,
  // the whole 'Part' including the title 'name' and 'exerciseCount'
  // can be returned in the <Part /> component
  // by using a variable details and returning after switch case
  // return (
  //   <div>
  //     <h4>
  //       {part.name} (exercises {part.exerciseCount})
  //     </h4>
  //     <>{details}</>
  //   </div>
  // );
};

export default Part;
