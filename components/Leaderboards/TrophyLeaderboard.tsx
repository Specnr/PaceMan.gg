"use client";
import useSWR from "swr";
import dayjs from "dayjs";

import { TrophyEntry } from "../interfaces/TrophyEntry";
import TrophyTableEntry from "./TrophyTableEntry";
import { fetcher } from "@/public/functions/converters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { MessageSpinner } from "../MessageSpinner";

export default function TrophyLeaderboard({ season }: { season: string }) {
  const getNextSeasonEndDate = () => {
    const now = dayjs();
    const year = now.year();

    const dates = [
      dayjs(`${year}-02-01`).endOf("month"),
      dayjs(`${year}-06-01`).endOf("month"),
      dayjs(`${year}-10-01`).endOf("month"),
      dayjs(`${year + 1}-02-01`).endOf("month"),
    ];

    return dates.find((d) => d.isAfter(now)) || dates[0];
  };

  const { data, isLoading, error } = useSWR(
    `https://paceman.gg/api/us/trophy?season=${season}`,
    fetcher,
    { revalidateOnFocus: false }
  );
  const trophyData: TrophyEntry[] = data;

  // Loading state
  if (isLoading || !trophyData) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <MessageSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 text-3xl mb-4" />
        <p className="text-gray-300">Failed to load trophy data</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  // Empty state
  if (trophyData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-300 text-lg mb-2">There are no trophy entries yet...</p>
        <p className="text-gray-500 text-sm">Check back soon or try a different season</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {season === "current" && (
        <div className="px-4 py-1 pb-3 text-sm text-gray-400 font-medium italic">
          Season ends {getNextSeasonEndDate().format("MM/DD/YYYY")}
        </div>
      )}
      <div className="overflow-y-auto max-h-[50vh] pb-4">
        <div className="grid grid-cols-[80px_1fr_60px] md:grid-cols-[80px_1fr_100px_100px_100px] text-xs uppercase tracking-wider text-gray-400 px-4 py-2">
          <div>Place</div>
          <div>Player</div>
          <div>Score</div>
          <div className="hidden md:block">PB</div>
          <div className="hidden md:block">D/W/M</div>
        </div>

        {trophyData.map((entry: TrophyEntry, idx: number) => (
          <div key={entry.uuid} className="border-b border-gray-700/50 last:border-0">
            <TrophyTableEntry trophyEntry={entry} placement={idx + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
