import Image from "next/image";
import { useRouter } from "next/navigation";

import Link from "./Link";

import { msToTime, uuidToHead } from "@/public/functions/frontendConverters";

import ADV_TO_NAME from "../public/data/advancements.json";
import { AAPace } from "./interfaces/Pace";
import { advToIcon } from "@/public/functions/aa";

export default function AAPaceEntry(props: AAPace) {
  const router = useRouter();

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
            src={advToIcon(props.completed[props.completed.length - 1].name)}
            width={28}
            height={28}
            unoptimized
          />
        </td>
        <td className="px-4 md:px-2 py-4">
          <span className="font-bold">{props.completed.length}/80 - </span>
          {(ADV_TO_NAME as any)[props.completed[props.completed.length - 1].name]}
        </td>
        <td className="px-4 md:px-6 py-4 btn">
          {msToTime(props.currentTime)}
        </td>
      </tr>
    </>
  )
};