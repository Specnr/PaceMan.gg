import { msToTime, uuidToHead } from "@/public/functions/converters";
import Pace from "./interfaces/Pace";
import Image from "next/image";
import Link from "./Link";

interface Props extends Pace {
  isLast: boolean
}

export default function PaceEntry(props: Props) {
  return (
    <tr className={"bg-gray-800 border-gray-700 " + (!props.isLast && " border-b")}>
      <td
        className="pl-4 h-0 w-0 md:h-14 md:w-14 md:pl-6 md:py-4"
        scope="row"
        width={54}>
          <Image
            alt="avatar"
            src={uuidToHead(props.uuid)}
            width={28}
            height={28}
          />
      </td>
      <td className="pl-2 pr-6 py-4 font-medium">
        {
          props.twitch ? (
            <Link link={`https://twitch.tv/${props.twitch}`}>{props.nickname}</Link>
          ) : props.nickname
        }
      </td>
      <td className="px-6 py-4">{props.split}</td>
      <td className="px-6 py-4">{msToTime(props.time)}</td>
    </tr>
  )
};