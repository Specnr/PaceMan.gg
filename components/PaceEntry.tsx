import { msToTime, uuidToHead } from "@/public/functions/converters";
import Pace from "./interfaces/Pace";
import Image from "next/image";

export default function PaceEntry(props: Pace) {
  return (
    <tr>
      <td>
        <Image
          alt="avatar"
          src={uuidToHead(props.uuid)}
          width={24}
          height={24}
        />
      </td>
      <td>
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
      <td>{props.split}</td>
      <td>{msToTime(props.time)}</td>
    </tr>
  )
};