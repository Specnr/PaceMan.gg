import Link from "./Link";

export default function Table(props: {
  titleOverrite?: string;
  link?: string;
}) {
  const text = props.titleOverrite ? props.titleOverrite : "MCSR PaceMan";
  return (
    <h1
      className={
        "w-fit mx-auto px-4 text-5xl lg:text-7xl font-semibold " +
        (props.titleOverrite ? "" : "pb-4 ")
      }
    >
      {!props.link ? text : <Link link={props.link}>{text}</Link>}
    </h1>
  );
}
