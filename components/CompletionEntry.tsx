import { msToTime, ordinalSuffix, placeToColor, uuidToHead } from "@/public/functions/frontendConverters";
import Image from "next/image";

interface Props {
  isLast: boolean
  uuid: string,
  nickname: string,
  time: number,
  placement: number
}

export default function CompletionEntry(props: Props) {
  const placementStyle = {
    color: placeToColor(props.placement),
    fontWeight: "bold",
    fontStyle: props.placement <= 3 ? "italic" : ""
  }

  return (
    <tr className={"bg-gray-800 border-gray-700 " + (!props.isLast && " border-b")}>
      <td className="pl-2 pr-6 py-4 font-medium">
        <p className="pl-4" style={placementStyle}>
          { ordinalSuffix(props.placement) }
          </p>
      </td>
      <td
        className="h-0 w-0 md:h-14 md:w-14 md:pl-6 md:py-4"
        scope="row"
        width={54}>
          <Image
            alt="avatar"
            src={uuidToHead(props.uuid)}
            width={28}
            height={28}
          />
      </td>
      <td className="px-6 py-4 font-medium">
        <p style={placementStyle}>{ props.nickname }</p>
      </td>
      <td className="px-6 py-4">
        <p style={placementStyle}>{msToTime(props.time)}</p>
      </td>
    </tr>
  )
};