import useSWR from "swr";
import { Spinner } from "@nextui-org/react";

import { TrophyEntry } from "../interfaces/TrophyEntry";
import TableHeader from "../TableHeader";
import TrophyTableEntry from "./TrophyTableEntry";
import { fetcher } from "@/public/functions/converters";

export default function TrophyLeaderboard({ season }: { season: string }) {
  const { data, isLoading, error } = useSWR(
    `https://paceman.gg/api/us/trophy?season=${season}`,
    fetcher,
    { revalidateOnFocus: false }
  );
  const trophyData: TrophyEntry[] = data;

  if (isLoading || !trophyData) {
    return (
      <div className="grid h-4/6 place-items-center">
        <Spinner color="secondary" size="lg" />
      </div>
    );
  }

  if (error || trophyData.length === 0) {
    return (
      <div className="grid h-4/6 place-items-center">
        There are no entries yet...
      </div>
    );
  }

  return (
    <div className={`mt-2 half-height overflow-y-auto w-full lg:w-2/4 mx-auto`}>
      <table className="relative text-lg text-left text-gray-400 justify-between w-full">
        <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <TableHeader>Place</TableHeader>
            <TableHeader colSpan={2}>Player</TableHeader>
            <TableHeader>Score</TableHeader>
            <TableHeader>PB</TableHeader>
            <TableHeader>D/W/M</TableHeader>
          </tr>
        </thead>
        <tbody className="text-medium lg:text-lg">
          {trophyData.map((t, i) => (
            <TrophyTableEntry trophyEntry={t} placement={i + 1} key={t.uuid} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
