import {
  EVENT_ID_NAME,
  msToDate,
  msToTime,
} from "@/public/functions/frontendConverters";
import { EventItem } from "../interfaces/Completion";
import { useState } from "react";

interface Props {
  eventList: EventItem[];
  submitted: number;
}

export const SimpleCompletionEntry = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const submittedDate = msToDate(Math.floor(props.submitted / 1000));
  const placementStyle = { fontWeight: "bold" };

  return (
    <>
      <tr className="bg-gray-800 border-gray-700">
        <td className="px-6 py-4 w-2/4">
          <button
            style={placementStyle}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {msToTime(props.eventList[props.eventList.length - 1].time)}
          </button>
        </td>
        <td className="px-6 py-4">
          <button
            style={placementStyle}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {submittedDate}
          </button>
        </td>
      </tr>
      {isExpanded &&
        props.eventList!.map((e) => (
          <tr
            key={`${props.submitted}${e.eventId}`}
            className="bg-gray-800 border-gray-700 text-sm"
          >
            <td className="px-6">{EVENT_ID_NAME[e.eventId]}</td>
            <td className="px-6">{msToTime(e.time)}</td>
          </tr>
        ))}
    </>
  );
};
