import Image from "next/image";

import {
  msToTime,
  ordinalSuffix,
  placeToColor,
  uuidToHead,
} from "@/public/functions/frontendConverters";
import { EventItem } from "./interfaces/Completion";

interface Props {
  uuid: string;
  nickname: string;
  eventList: EventItem[];
  placement: number;
}

export default function CompletionEntry(props: Props) {
  const placementStyle = {
    color: placeToColor(props.placement),
    fontWeight: "bold",
    fontStyle: props.placement <= 3 ? "italic" : "",
  };

  return (
    <tr className="bg-gray-800 border-gray-700">
      <td className="pl-2 pr-6 py-4 font-medium w-1">
        <p className="pl-4" style={placementStyle}>
          {ordinalSuffix(props.placement)}
        </p>
      </td>
      <td
        className="h-0 w-0 md:h-14 md:w-14 md:pl-6 md:py-4"
        scope="row"
        width={54}
      >
        <Image
          alt="avatar"
          src={uuidToHead(props.uuid)}
          width={28}
          height={28}
        />
      </td>
      <td className="px-6 py-4 font-medium">
        <p style={placementStyle}>{props.nickname}</p>
      </td>
      <td className="px-6 py-4">
        <p style={placementStyle}>
          {msToTime(props.eventList[props.eventList.length - 1].time)}
        </p>
      </td>
    </tr>
  );
}
