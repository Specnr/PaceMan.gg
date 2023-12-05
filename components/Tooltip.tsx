import { Children } from "./interfaces/Children";

export default function Tooltip(props: Children) {
  return (
    <span className="absolute transition-all top-0 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
      {props.children}
    </span>
  );
}
