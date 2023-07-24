import { msToTime, uuidToHead } from "@/public/functions/converters";
import Pace from "./interfaces/Pace";
import Image from "next/image";

interface Props extends Pace {
  isLast: boolean
}

export default function PaceEntry(props: Props) {
  return (
    <tr className={"bg-gray-800 border-gray-700" + (!props.isLast && " border-b")}>
      <td
        className="pl-6 py-4"
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
            <a
              className="text-blue-500 hover:text-blue-700"
              target="_blank"
              href={`https://twitch.tv/${props.twitch}`}>
                {props.nickname}
            </a>
          ) : props.nickname
        }
      </td>
      <td className="px-6 py-4">{props.split}</td>
      <td className="px-6 py-4">{msToTime(props.time)}</td>
    </tr>
  )
};