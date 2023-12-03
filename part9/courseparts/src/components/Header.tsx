interface HeaderProps {
  name: string;
}

// Cleaner code, write everything in one line without having to
// declare a separate interface and use props.part every single time:
// const Header = ({ text }: { text: string }) => {
const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

export default Header;
