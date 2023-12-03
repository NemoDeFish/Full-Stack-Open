import CoursePart from "../types";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

// Destructure part in props:
// const Content = ({ parts }: Props) => {
const Content = (props: ContentProps) => {
  return props.parts.map((part) => (
    // Can be simplified to just rendering a <Part /> component
    <p key={part.name}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      <Part part={part} />
    </p>
  ));
};

export default Content;
