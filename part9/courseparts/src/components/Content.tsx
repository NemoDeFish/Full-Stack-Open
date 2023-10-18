import CoursePart from "../types";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return props.parts.map((part) => (
    <p key={part.name}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      <Part part={part} />
    </p>
  ));
};

export default Content;
