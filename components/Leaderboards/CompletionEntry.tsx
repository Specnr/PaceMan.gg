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

  const placementStyle = {
    color: placeToColor(props.placement),
    fontWeight: "bold",
    fontStyle: props.placement <= 3 ? "italic" : "",
  };

  return (
    <>
      <tr className="bg-gray-800 border-gray-700">
        <td className="pl-2 pr-6 py-4 font-medium w-1">
          <button
            className="pl-4"
            style={placementStyle}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {ordinalSuffix(props.placement)}
          </button>
        </td>
        <td className="h-0 w-0 md:h-14 md:w-14 md:pl-6" scope="row" width={54}>
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
        <td className="max-w-xs truncate px-6 py-4 font-medium">
          <button
            style={placementStyle}
            onClick={() => router.push(`/stats/player/${props.nickname}`)}
          >
            {props.nickname}
          </button>
        </td>
        <td className="px-6 py-4">
          <Tooltip
            showArrow
            content={`Submitted ${msToDate(
              Math.floor(props.submitted / 1000)
            )}`}
          >
            <button
              style={placementStyle}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {msToTime(props.eventList[props.eventList.length - 1].time)}
            </button>
          </Tooltip>
        </td>
      </tr>
      {isExpanded &&
        props.eventList!.map((e) => (
          <tr
            key={`${props.uuid}${e.eventId}`}
            className="bg-gray-800 border-gray-700 text-sm"
          >
            <td colSpan={2} />
            <td className="px-6">{EVENT_ID_NAME[e.eventId]}</td>
            <td className="px-6">{msToTime(e.time)}</td>
          </tr>
        ))}
    </>
  );
}
