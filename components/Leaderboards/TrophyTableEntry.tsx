import {
  msToTime,
  ordinalSuffix,
  placeToColor,
  uuidToHead,
} from "@/public/functions/frontendConverters";
import { TrophyEntry } from "../interfaces/TrophyEntry";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";

interface Props {
  trophyEntry: TrophyEntry;
  placement: number;
}

export default function TrophyTableEntry({ trophyEntry, placement }: Props) {
  const router = useRouter();

  const placementStyle = {
    color: placeToColor(placement),
    fontWeight: "bold",
    fontStyle: placement <= 3 ? "italic" : "",
  };

  return (
    <tr className="bg-gray-800 border-gray-700">
      <td className="pl-2 pr-6 py-4 font-medium w-1">
        <button className="pl-4" style={placementStyle}>
          {ordinalSuffix(placement)}
        </button>
      </td>
      <td className="h-0 w-0 md:h-14 md:w-14 md:pl-6" scope="row" width={54}>
        <button
          className="pt-2"
          onClick={() => router.push(`/stats/player/${trophyEntry.nickname}`)}
        >
          <Image
            alt="avatar"
            src={uuidToHead(trophyEntry.uuid)}
            width={28}
            height={28}
            unoptimized
          />
        </button>
      </td>
      <td className="max-w-xs truncate px-6 py-4 font-medium">
        <button
          style={placementStyle}
          onClick={() => router.push(`/stats/player/${trophyEntry.nickname}`)}
        >
          {trophyEntry.nickname}
        </button>
      </td>
      <td className="px-6 py-4" style={placementStyle}>
        <Tooltip
            showArrow
            content={
              <div className="text-left">
                <p>{trophyEntry.score - trophyEntry.bonus} + {trophyEntry.bonus} Bonus</p>
              </div>
            }>
          <span>{trophyEntry.score}</span>
        </Tooltip>
      </td>
      <td className="px-6 py-4" style={placementStyle}>
        <span>{msToTime(trophyEntry.pb)}</span>
      </td>
      <td className="px-6 py-4" style={placementStyle}>
        <span>{trophyEntry.daily}/{trophyEntry.weekly}/{trophyEntry.monthly}</span>
      </td>
    </tr>
  );
}
