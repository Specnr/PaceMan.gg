import Image from "next/image";
import {
  msToTime,
  ordinalSuffix,
  placeToColor,
  uuidToHead,
} from "@/public/functions/frontendConverters";
import { useRouter } from "next/navigation";
import { Ranking } from "../interfaces/Completion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  ranking: Ranking;
  placement: number;
}

export default function RankingTableEntry({ ranking, placement }: Props) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Style classes based on placement
  const placementClasses = placement <= 3 ? "font-bold" : "";

  return (
    <>
      <div className="grid grid-cols-[80px_minmax(0,1fr)_80px_80px] md:grid-cols-[80px_minmax(0,1fr)_80px_160px] py-3 px-4 hover:bg-gray-700/30 transition-colors duration-150">
        {/* Placement column */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="focus:outline-none"
          >
            <span
              className={`${placementClasses}`}
              style={{ color: placeToColor(placement) }}
            >
              {ordinalSuffix(placement)}
            </span>
          </button>
        </div>

        {/* Player column */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            className="transition-transform hover:scale-110 focus:outline-none hidden sm:block"
            onClick={() => router.push(`/stats/player/${ranking.nickname}`)}
            aria-label={`View stats for ${ranking.nickname}`}
          >
            <div className="w-8 h-8 overflow-hidden">
              <Image
                alt={`${ranking.nickname}'s avatar`}
                src={uuidToHead(ranking.uuid)}
                width={32}
                height={32}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          <span
            className={`${placementClasses} truncate max-w-full`}
            style={{ color: placeToColor(placement) }}
          >
            {ranking.nickname}
          </span>
        </div>

        {/* Points column */}
        <div className="flex items-center justify-start">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${placementClasses} focus:outline-none`}
            style={{ color: placeToColor(placement) }}
          >
            {ranking.totalPoints}
          </button>
        </div>

        {/* Time column */}
        <div className="flex items-center justify-start">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${placementClasses} focus:outline-none`}
            style={{ color: placeToColor(placement) }}
          >
            {msToTime(ranking.completions[0].time)}
            {ranking.completions && ranking.completions.length > 0 && (
              <FontAwesomeIcon
                icon={isExpanded ? faChevronUp : faChevronDown}
                className="text-xs text-gray-500 ml-2"
              />
            )}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && ranking.completions.length > 0 && (
        <div className="bg-gray-900 mx-2 mb-2 rounded-md shadow-lg">
          {ranking.completions.map((completion, index) => (
            <div
              key={`${ranking.uuid}-c-${index}`}
              className="grid grid-cols-[80px_minmax(0,1fr)_80px_80px] md:grid-cols-[80px_minmax(0,1fr)_80px_160px] px-4 py-1.5 border-b border-gray-600/20 last:border-0"
            >
              <div></div>
              <div></div>
              <div className="text-gray-300 text-sm ml-2">{completion.points}</div>
              <div className="text-gray-300 text-sm ml-2">{msToTime(completion.time)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
