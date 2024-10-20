import {
  lastUpdatedDifference,
  msToTime,
  splitToIcon,
  uuidToHead,
} from "@/public/functions/frontendConverters";
import { Pace } from "./interfaces/Pace";
import Link from "./Link";
import { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ItemEstimateTooltipContent from "./Leaderboards/ItemEstimateTooltipContent";
import React from "react";

export default function PaceEntry(props: Pace) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [estimatedPace, setEstimatedPace] = useState(
    lastUpdatedDifference(props.lastUpdated, props.time)
  );

  const hqClassNames = props.isHighQuality ? " font-extrabold" : "";

  return (
    <>
      <tr className={"bg-gray-800 border-gray-700"}>
        <td
          className="pl-2 h-0 w-0 md:h-14 md:w-14 md:pl-6"
          scope="row"
          width={54}
        >
          <button
            className="pt-2"
            onClick={() => router.push(`/stats/player/${props.nickname}`)}
          >
            <Image
              alt="avatar"
              src={uuidToHead(props.uuid)}
              width={28}
              height={28}
              unoptimized
            />
          </button>
        </td>
        <td className="pl-2 pr-6 py-4 font-medium">
          {props.twitch ? (
            <Link link={`https://twitch.tv/${props.twitch}`}>
              {props.nickname}
            </Link>
          ) : (
            <button>{props.nickname}</button>
          )}
        </td>
        <td
          className="h-0 w-0 md:h-14 md:w-14 md:pl-6 md:py-4"
          scope="row"
          width={54}
        >
          <Image
            alt="avatar"
            src={splitToIcon(props.split!)}
            width={28}
            height={28}
            unoptimized
          />
        </td>
        <td className={`px-4 md:px-2 py-4 ${hqClassNames}`}>
          <Tooltip
              hidden={!props.itemEstimates}
              showArrow
              content={<ItemEstimateTooltipContent estimates={props.itemEstimates} />}
            >
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {props.splitName}
            </button>
          </Tooltip>
        </td>
        <td className={`px-4 md:px-6 py-4 btn ${hqClassNames}`}>
          <Tooltip
            showArrow
            onAnimationStart={() =>
              setEstimatedPace(
                lastUpdatedDifference(props.lastUpdated, props.time)
              )
            }
            content={`Currently ${estimatedPace}`}
          >
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {msToTime(props.time)}
            </button>
          </Tooltip>
        </td>
      </tr>
      {isExpanded &&
        props.eventList!.map((e) => (
          <tr
            key={`${props.uuid}${e.name}`}
            className="bg-gray-800 border-gray-700 text-sm"
          >
            <td colSpan={3} />
            <td className="px-4 md:px-2">{e.name}</td>
            <td className="px-4 md:px-6">{msToTime(e.time)}</td>
          </tr>
        ))}
    </>
  );
}
