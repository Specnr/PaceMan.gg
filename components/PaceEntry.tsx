import {
  lastUpdatedDifference,
  msToTime,
  splitToIcon,
  uuidToHead,
} from "@/public/functions/frontendConverters";
import { Pace } from "./interfaces/Pace";
import Link from "./Link";
import { useState } from "react";
import { Tooltip, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ItemEstimateTooltipContent from "./Leaderboards/ItemEstimateTooltipContent";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faClock } from "@fortawesome/free-solid-svg-icons";

interface PaceEntryProps extends Pace {
  showVersion?: boolean;
}

export default function PaceEntry(props: PaceEntryProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [estimatedPace, setEstimatedPace] = useState(
    lastUpdatedDifference(props.lastUpdated, props.time)
  );

  // Style classes based on run quality
  const qualityClasses = props.isHighQuality
    ? "font-bold text-white"
    : "text-gray-300";

  // Style for live streamers
  const liveStreamClasses = props.twitch
    ? "text-blue-400 hover:text-blue-300"
    : "";

  return (
    <>
      <div className={`grid ${props.showVersion
        ? 'grid-cols-[1fr_1fr_80px] md:grid-cols-[1fr_1fr_auto_240px]'
        : 'grid-cols-[1fr_1fr_80px] md:grid-cols-[1fr_1fr_240px]'} py-3 px-4 hover:bg-gray-700/30 transition-colors duration-150`}>
        {/* Player column */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            className="transition-transform hover:scale-110 focus:outline-none hidden sm:block flex-shrink-0"
            onClick={() => router.push(`/stats/player/${props.nickname}`)}
            aria-label={`View stats for ${props.nickname}`}
          >
            <div className="w-8 h-8 relative">
              <Image
                alt={`${props.nickname}'s avatar`}
                src={uuidToHead(props.uuid)}
                width={32}
                height={32}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {props.twitch ? (
            <Link
              link={`https://twitch.tv/${props.twitch}`}
              className={`${qualityClasses} ${liveStreamClasses} font-medium truncate max-w-full`}
            >
              {props.nickname}
            </Link>
          ) : (
            <span className={`${qualityClasses} font-medium truncate max-w-full`}>{props.nickname}</span>
          )}
        </div>

        {/* Split column */}
        <div className="flex items-center gap-3 max-w-full">
          <div className="flex-shrink-0 hidden sm:block relative">
            <Image
              alt={`${props.splitName} icon`}
              src={splitToIcon(props.split!)}
              width={28}
              height={28}
              unoptimized
            />
          </div>

          <Tooltip
            hidden={!props.itemEstimates}
            showArrow
            content={<ItemEstimateTooltipContent estimates={props.itemEstimates} />}
            className="bg-gray-900 border border-gray-700"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 focus:outline-none max-w-full overflow-hidden"
            >
              <span className={`${qualityClasses} truncate max-w-full`}>{props.splitName}</span>
            </button>
          </Tooltip>
        </div>

        {/* Version column */}
        {props.showVersion && (
          <div className="hidden md:flex items-center">
            <Chip
              size="sm"
              variant="flat"
              color="secondary"
              className="bg-purple-900/30"
            >
              {props.gameVersion}
            </Chip>
          </div>
        )}

        {/* Time column */}
        <div className="flex items-center justify-start">
          <Tooltip
            showArrow
            placement="left"
            onAnimationStart={() =>
              setEstimatedPace(
                lastUpdatedDifference(props.lastUpdated, props.time)
              )
            }
            content={
              <div className="px-2 py-1">
                <div className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faClock} className="text-purple-400" />
                  <span>Currently {estimatedPace}</span>
                </div>
              </div>
            }
            className="bg-gray-900 border border-gray-700"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${qualityClasses} focus:outline-none whitespace-nowrap`}
            >
              {msToTime(props.time)}
              {props.eventList && props.eventList.length > 0 && (
                <FontAwesomeIcon
                  icon={isExpanded ? faChevronUp : faChevronDown}
                  className="text-xs text-gray-500 ml-2"
                />
              )}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && props.eventList && props.eventList.length > 0 && (
        <div className="bg-gray-900 mx-2 mb-2 rounded-md shadow-lg">
          {props.eventList.map((e, index) => (
            <div
              key={`${props.uuid}-${e.name}-${index}`}
              className={`grid ${props.showVersion
                ? 'grid-cols-[1fr_1fr_80px] md:grid-cols-[1fr_1fr_auto_240px]'
                : 'grid-cols-[1fr_1fr_80px] md:grid-cols-[1fr_1fr_240px]'} px-4 py-1.5 border-b border-gray-600/20 last:border-0`}
            >
              <div></div>
              <div className="text-gray-400 text-sm truncate">{e.name}</div>
              {props.showVersion && <div className="hidden md:block"></div>}
              <div className="text-gray-300 text-sm sm:text-left ml-2">{msToTime(e.time)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
