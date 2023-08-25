interface Props {
  link: string
  children: string
  stay?: boolean
}

export default function Link(props: Props) {
  return (
    <a
      className="text-blue-500 hover:text-blue-700"
      target={!props.stay ? "_blank" : "_self"}
      href={props.link}
    >
      {props.children}
    </a>
  );
};