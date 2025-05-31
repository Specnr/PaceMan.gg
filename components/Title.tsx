import { ReactNode } from "react";
import Link from "./Link";

export default function Title(props: {
  titleOverrite?: string | ReactNode;
  link?: string;
}) {
  const text = props.titleOverrite ? props.titleOverrite : "MCSR PaceMan";
  
  return (
    <div className="w-full text-center mb-8">
      <h1
        className={`
          relative inline-block text-5xl lg:text-7xl font-bold
          bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600
          px-4 py-2 ${props.titleOverrite ? "" : "mb-4"}
        `}
      >
        {!props.link ? text : <Link link={props.link}>{text}</Link>}
      </h1>
      {!props.titleOverrite && (
        <p className="text-lg text-gray-300 mt-2 fade-in">
          The best Minecraft Speedrunning pace in real-time
        </p>
      )}
    </div>
  );
}
