import { ReactNode } from "react";

interface Props {
  children: ReactNode
  colSpan?: number
}

export default function TableHeader(props: Props) {
  return (
    <th scope="col" className="px-6 py-3" colSpan={props.colSpan}>{props.children}</th>
  );
}