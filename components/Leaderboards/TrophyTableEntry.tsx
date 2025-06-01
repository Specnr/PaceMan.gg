import {
  msToTime,
  ordinalSuffix,
  placeToColor,
  uuidToHead,
} from "@/public/functions/frontendConverters";
import { TrophyEntry } from "../interfaces/TrophyEntry";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

interface Props {
  trophyEntry: TrophyEntry;
  placement: number;
}

export default function TrophyTableEntry({ trophyEntry, placement }: Props) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Style classes based on placement
  const placementClasses = placement <= 3
    ? "font-bold"
    : "";

  return (
    <div className="grid grid-cols-[80px_minmax(0,1fr)_100px] md:grid-cols-[80px_minmax(0,1fr)_100px_100px_100px] py-3 px-4 hover:bg-gray-700/30 transition-colors duration-150">
      {/* Placement column */}
      <div className="flex items-center">
        <span
          className={placementClasses}
          style={{ color: placeToColor(placement) }}
        >
          {ordinalSuffix(placement)}
        </span>
      </div>

      {/* Player column */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="transition-transform hover:scale-110 focus:outline-none hidden sm:block"
          onClick={() => router.push(`/stats/player/${trophyEntry.nickname}`)}
          aria-label={`View stats for ${trophyEntry.nickname}`}
        >
          <div className="w-8 h-8 overflow-hidden">
            <Image
              alt={`${trophyEntry.nickname}'s avatar`}
              src={uuidToHead(trophyEntry.uuid)}
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
          {trophyEntry.nickname}
        </span>
      </div>

      {/* Score column */}
      <div className="flex items-center">
        <Tooltip
          showArrow
          placement="top"
          content={
            <div className="px-2 py-1">
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faTrophy} className="text-purple-400" />
                <span>{trophyEntry.score - trophyEntry.bonus} + {trophyEntry.bonus} Bonus</span>
              </div>
            </div>
          }
          className="bg-gray-900 border border-gray-700"
        >
          <span
            className={placementClasses}
            style={{ color: placeToColor(placement) }}
          >
            {trophyEntry.score}
          </span>
        </Tooltip>
      </div>

      {/* PB column - hidden on mobile */}
      <div className="hidden md:flex items-center">
        <span
          className={placementClasses}
          style={{ color: placeToColor(placement) }}
        >
          {msToTime(trophyEntry.pb)}
        </span>
      </div>

      {/* D/W/M column - hidden on mobile */}
      <div className="hidden md:flex items-center">
        <span
          className={placementClasses}
          style={{ color: placeToColor(placement) }}
        >
          {trophyEntry.daily}/{trophyEntry.weekly}/{trophyEntry.monthly}
        </span>
      </div>
    </div>
  );
}
