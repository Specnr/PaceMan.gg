import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "@nextui-org/react";

import Link from "../Link";

import { lastUpdatedDifference, msToTime, uuidToHead } from "@/public/functions/frontendConverters";
import ADV_TO_NAME from "../../public/data/advancements.json";
import { AAPace } from "../interfaces/Pace";
import { advToIcon } from "@/public/functions/aa";
import AdvancementDetailsTooltipContent from "./AdvancementDetailsTooltipContent";
import { AAMissingIcon } from "./AAMissingIcon";

export default function AAPaceEntry(props: AAPace) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [estimatedPace, setEstimatedPace] = useState(lastUpdatedDifference(props.lastUpdated, props.currentTime));

  console.log(props.context);

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
            src={advToIcon(props.completed[0].name)}
            width={28}
            height={28}
            unoptimized
          />
        </td>
        <td className="px-4 md:px-2 py-4">
          <Tooltip
            showArrow
            hidden={!props.criterias}
            content={<AdvancementDetailsTooltipContent criterias={props.criterias} context={props.context} />}
          >
            <button onClick={() => setIsExpanded(!isExpanded)}>
              <span className="font-bold">{props.completed.length}/80 - </span>
              {(ADV_TO_NAME as any)[props.completed[0].name]}
            </button>
          </Tooltip>
        </td>
        <td className="px-4 md:px-6 py-4 btn">
          <Tooltip
            showArrow
            onAnimationStart={() =>
              setEstimatedPace(
                lastUpdatedDifference(props.lastUpdated, props.currentTime)
              )
            }
            content={`Currently ${estimatedPace}`}
          >
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {msToTime(props.currentTime)}
            </button>
          </Tooltip>
        </td>
        <td className="h-0 w-0 2xl:h-full 2xl:w-full 2xl:px-6 2xl:py-4 flex">
          <AAMissingIcon icon="jungle" context={props.context.jungle} />
          <AAMissingIcon icon="mesa" context={props.context.mesa} />
          <AAMissingIcon icon="snowy" context={props.context.snowy} />
          <AAMissingIcon icon="mushroom" context={props.context.mushroom} />
          <AAMissingIcon icon="thunder" context={props.context.thunder} />
          <AAMissingIcon icon="phantom" context={props.context.phantoms} />
          <AAMissingIcon icon="endgame" context={props.context.endgame} />
        </td>
      </tr>
      {isExpanded &&
        props.completed.map((e) => (
          <tr
            key={`${props.uuid}${e.name}`}
            className="bg-gray-800 border-gray-700 text-sm"
          >
            <td colSpan={3} />
            <td className="px-4 md:px-2">{(ADV_TO_NAME as any)[e.name]}</td>
            <td className="px-4 md:px-6">{msToTime(e.time)}</td>
            <td />
          </tr>
        ))}
    </>
  )
};