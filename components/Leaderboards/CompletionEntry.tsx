import Image from "next/image";

import {
  EVENT_ID_NAME,
  msToDate,
  msToTime,
  ordinalSuffix,
  placeToColor,
  uuidToHead,
} from "@/public/functions/frontendConverters";
import { EventItem } from "../interfaces/Completion";
import { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faClock } from "@fortawesome/free-solid-svg-icons";

interface Props {
  uuid: string;
  nickname: string;
  eventList: EventItem[];
  placement: number;
  submitted: number;
}

export default function CompletionEntry(props: Props) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Style classes based on placement
  const placementClasses = props.placement <= 3
    ? "font-bold"
    : "";

  return (
    <>
      <div className="grid grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] py-3 px-4 hover:bg-gray-700/30 transition-colors duration-150">
        {/* Placement column */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="focus:outline-none"
          >
            <span
              className={`${placementClasses}`}
              style={{ color: placeToColor(props.placement) }}
            >
              {ordinalSuffix(props.placement)}
            </span>
          </button>
        </div>

        {/* Player column */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            className="transition-transform hover:scale-110 focus:outline-none hidden sm:block"
            onClick={() => router.push(`/stats/player/${props.nickname}`)}
            aria-label={`View stats for ${props.nickname}`}
          >
            <div className="w-8 h-8 overflow-hidden">
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

          <span
            className={`${placementClasses} truncate max-w-full`}
            style={{ color: placeToColor(props.placement) }}
          >
            {props.nickname}
          </span>
        </div>

        {/* Time column */}
        <div className="flex items-center justify-start min-w-0">
          <Tooltip
            showArrow
            placement="left"
            content={
              <div className="px-2 py-1">
                <div className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faClock} className="text-purple-400" />
                  <span>Submitted {msToDate(Math.floor(props.submitted / 1000))}</span>
                </div>
              </div>
            }
            className="bg-gray-900 border border-gray-700"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${placementClasses} focus:outline-none`}
              style={{ color: placeToColor(props.placement) }}
            >
              {msToTime(props.eventList[props.eventList.length - 1].time)}
              {props.eventList && props.eventList.length > 1 && (
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
      {isExpanded && props.eventList.length > 0 && (
        <div className="bg-gray-900 py-2 mx-2 mb-2 rounded-md">
          {props.eventList.map((e, index) => (
            index !== props.eventList.length - 1 && (
              <div
                key={`${props.uuid}-${e.eventId}-${index}`}
                className="grid grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] px-4 py-1.5 border-b border-gray-600/20 last:border-0"
              >
                <div></div>
                <div className="text-gray-400 text-sm truncate -mx-2">{EVENT_ID_NAME[e.eventId]}</div>
                <div className="text-gray-300 text-sm text-left">{msToTime(e.time)}</div>
              </div>
            )
          ))}
        </div>
      )}
    </>
  );
}
