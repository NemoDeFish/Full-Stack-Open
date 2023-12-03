interface TotalProps {
  exercises: number;
}

// Cleaner code, write everything in one line without having to
// declare a separate interface and use props.part every single time:
// const Total = ({ parts }: Props) => {
const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.exercises}</p>;
};

export default Total;
