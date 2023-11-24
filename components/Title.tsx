export default function Table(props: { titleOverrite?: string }) {
  return (
    <h1 className={"px-4 text-5xl md:text-7xl font-semibold " + (props.titleOverrite ? null : "pb-4")}>
      { props.titleOverrite ? props.titleOverrite : "MCSR PaceMan" }
    </h1>
  );
}