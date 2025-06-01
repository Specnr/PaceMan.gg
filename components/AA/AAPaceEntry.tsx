import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import Link from "../Link";
import { lastUpdatedDifference, msToTime, uuidToHead } from "@/public/functions/frontendConverters";
import ADV_TO_NAME from "../../public/data/advancements.json";
import { AAPace } from "../interfaces/Pace";
import { advToIcon } from "@/public/functions/aa";
import AdvancementDetailsTooltipContent from "./AdvancementDetailsTooltipContent";
import { AAMissingIcon } from "./AAMissingIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faClock } from "@fortawesome/free-solid-svg-icons";

export default function AAPaceEntry(props: AAPace) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [estimatedPace, setEstimatedPace] = useState(lastUpdatedDifference(props.lastUpdated, props.currentTime));

  // Style classes based on run quality
  const qualityClasses = "text-gray-300";

  // Style for live streamers
  const liveStreamClasses = props.twitch
    ? "text-purple-400 hover:text-purple-300"
    : "";

  return (
    <>
      <div className="grid grid-cols-[120px_minmax(0,1fr)_80px] lg:grid-cols-[200px_minmax(0,1fr)_1fr_80px] py-3 px-4 hover:bg-gray-700/30 transition-colors duration-150">
        {/* Player column */}
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          <button
            className="transition-transform hover:scale-110 focus:outline-none flex-shrink-0"
            onClick={() => router.push(`/stats/player/${props.nickname}`)}
            aria-label={`View stats for ${props.nickname}`}
          >
            <div className="w-7 h-7 overflow-hidden">
              <Image
                alt={`${props.nickname}'s avatar`}
                src={uuidToHead(props.uuid)}
                width={28}
                height={28}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {props.twitch ? (
            <Link
              link={`https://twitch.tv/${props.twitch}`}
              className={`${qualityClasses} ${liveStreamClasses} font-medium truncate max-w-full text-sm`}
            >
              {props.nickname}
            </Link>
          ) : (
            <span className={`${qualityClasses} font-medium truncate max-w-full text-sm`}>{props.nickname}</span>
          )}
        </div>

        {/* Advancement column */}
        <div className="flex items-center gap-3 overflow-hidden max-w-full">
          <div className="flex-shrink-0 hidden sm:block">
            <Image
              alt="advancement icon"
              src={advToIcon(props.completed[0].name)}
              width={32}
              height={32}
              unoptimized
            />
          </div>

          <Tooltip
            hidden={!props.criterias}
            showArrow
            content={<AdvancementDetailsTooltipContent criterias={props.criterias} context={props.context} items={props.items} />}
            className="bg-gray-900 border border-gray-700"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 focus:outline-none max-w-full overflow-hidden"
            >
              <span className={`${qualityClasses} truncate max-w-full`}>
                <span className="font-bold">{props.completed.length}/80</span>
                <span className="hidden sm:inline"> - {(ADV_TO_NAME as any)[props.completed[0].name]}</span>
              </span>
            </button>
          </Tooltip>
        </div>

        {/* Missing icons column - only visible on lg+ */}
        <div className="hidden lg:flex items-center justify-start gap-1 h-12 overflow-hidden">
          <div className="flex items-center flex-wrap gap-1.5">
            <AAMissingIcon icon="jungle" context={props.context.jungle} />
            <AAMissingIcon icon="mesa" context={props.context.mesa} />
            <AAMissingIcon icon="snowy" context={props.context.snowy} />
            <AAMissingIcon icon="mushroom" context={props.context.mushroom} />
            <AAMissingIcon icon="thunder" context={props.context.thunder} />
            <AAMissingIcon icon="phantom" context={props.context.phantoms} />
            <AAMissingIcon icon="endgame" context={props.context.endgame} />
          </div>
        </div>

        {/* Time column */}
        <div className="flex items-center justify-end md:justify-center">
          <Tooltip
            showArrow
            placement="left"
            onAnimationStart={() =>
              setEstimatedPace(
                lastUpdatedDifference(props.lastUpdated, props.currentTime)
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
              {msToTime(props.currentTime)}
              {props.completed && props.completed.length > 0 && (
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
      {isExpanded && props.completed && props.completed.length > 0 && (
        <div className="bg-gray-900 mx-2 mb-2 rounded-md shadow-lg">
          {props.completed.map((e, index) => (
            <div
              key={`${props.uuid}-${e.name}-${index}`}
              className="grid grid-cols-[120px_minmax(0,1fr)_80px] md:grid-cols-[200px_minmax(0,1fr)_110px_80px] px-4 py-1.5 border-b border-gray-600/20 last:border-0"
            >
              <div></div>
              <div className="text-gray-400 text-sm truncate -ml-2">{(ADV_TO_NAME as any)[e.name]}</div>
              <div className="hidden md:block"></div>
              <div className="text-gray-300 text-sm ml-2">{msToTime(e.time)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}