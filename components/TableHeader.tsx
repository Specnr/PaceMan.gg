interface Props {
  children: React.ReactNode
  colSpan?: number
}

export default function TableHeader(props: Props) {
  return (
    <th scope="col" className="px-6 py-3" colSpan={props.colSpan}>{props.children}</th>
  );
}