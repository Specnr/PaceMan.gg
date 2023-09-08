interface Props {
  link: string
  children: string
  stay?: boolean
  className?: string
}

export default function Link(props: Props) {
  return (
    <a
      className={"text-blue-500 hover:text-blue-700 " + (props.className ? props.className : "")}
      target={!props.stay ? "_blank" : "_self"}
      href={props.link}
    >
      {props.children}
    </a>
  );
};