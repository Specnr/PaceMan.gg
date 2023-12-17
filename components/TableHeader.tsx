interface Props {
  children: React.ReactNode;
  colSpan?: number;
}

export default function TableHeader(props: Props) {
  return (
    <th
      scope="col"
      className={`px-4 py-3 lg:px-6 lg:py-3`}
      colSpan={props.colSpan}
    >
      {props.children}
    </th>
  );
}
