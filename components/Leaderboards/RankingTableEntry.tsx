import {
  msToTime,
  ordinalSuffix,
  placeToColor,
  uuidToHead,
} from "@/public/functions/frontendConverters";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Ranking } from "../interfaces/Completion";
import { useState } from "react";

interface Props {
  ranking: Ranking;
  placement: number;
}

export default function RankingTableEntry({ ranking, placement }: Props) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const placementStyle = {
    color: placeToColor(placement),
    fontWeight: "bold",
    fontStyle: placement <= 3 ? "italic" : "",
  };

  return (
    <>
      <tr className="bg-gray-800 border-gray-700">
        <td className="pl-2 pr-6 py-4 font-medium w-1">
          <button className="pl-4" style={placementStyle}>
            {ordinalSuffix(placement)}
          </button>
        </td>
        <td className="h-0 w-0 md:h-14 md:w-14 md:pl-6" scope="row" width={54}>
          <button
            className="pt-2"
            onClick={() => router.push(`/stats/player/${ranking.nickname}`)}
          >
            <Image
              alt="avatar"
              src={uuidToHead(ranking.uuid)}
              width={28}
              height={28}
              unoptimized
            />
          </button>
        </td>
        <td className="max-w-xs truncate px-6 py-4 font-medium">
          <button
            style={placementStyle}
            onClick={() => router.push(`/stats/player/${ranking.nickname}`)}
          >
            {ranking.nickname}
          </button>
        </td>
        <td className="px-6 py-4" style={placementStyle}>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <span>{ranking.totalPoints}</span>
          </button>
        </td>
        <td className="px-6 py-4" style={placementStyle}>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <span>{msToTime(ranking.completions[0].time)}</span>
          </button>
        </td>
      </tr>
      {isExpanded && 
        ranking.completions.map((completion, idx) => (
          <tr
            key={`${ranking.uuid}-c-${idx}`}
            className="bg-gray-800 border-gray-700 text-sm"
          >
            <td colSpan={3} />
            <td className="px-4 md:px-6">{completion.points}</td>
            <td className="px-4 md:px-6">{msToTime(completion.time)}</td>
          </tr>
        ))}
    </>
  );
}
