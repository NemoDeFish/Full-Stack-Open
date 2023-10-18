import CoursePart from "../types";

interface PartProps {
  part: CoursePart;
}

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
  }
};

export default Part;
