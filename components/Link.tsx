interface Props {
  link: string
  children: string
}

export default function Link(props: Props) {
  return (
    <a
      className="text-blue-500 hover:text-blue-700"
      target="_blank"
      href={props.link}
    >
      {props.children}
    </a>
  );
};