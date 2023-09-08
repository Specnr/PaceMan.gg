interface Props {
  children: React.ReactNode
  colSpan?: number
  width?: number
}

export default function TableHeader(props: Props) {
  return (
    <th scope="col" className={`px-6 py-3 ${props.width ? `w-${props.width}` : ""}`} colSpan={props.colSpan}>{props.children}</th>
  );
}