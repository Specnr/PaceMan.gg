"use client";
import TableHeader from "@/components/TableHeader";
import { Spinner } from "@nextui-org/react";
import PaceEntry from "../PaceEntry";
import { Pace } from "../interfaces/Pace";
import useSWR from "swr";
import { apiToPace, paceSort } from "@/public/functions/converters";

const fetcher = async (url: string) => {
  const data = await fetch(url).then((res) => res.json());
  const paces = (await apiToPace(data)).sort(paceSort);
  return paces;
};

export default function PaceLeaderboard({
  whitelist,
}: {
  whitelist?: Set<string>;
}) {
  const { data, error, isLoading } = useSWR(
    "https://paceman.gg/api/ars/liveruns",
    fetcher,
    {
      refreshWhenHidden: true,
      refreshInterval: 1000,
    }
  );

  const eventPaces =
    !whitelist || !data || whitelist.has("TESTING")
      ? data!
      : data!.filter((pace) => whitelist?.has(pace.uuid));

  let msg = null;
  if (error) msg = "failed to load";
  else if (isLoading) msg = <Spinner color="secondary" size="lg" />;
  else if (!eventPaces || eventPaces.length === 0)
    msg = "No one is currently on pace...";

  if (msg !== null) {
    return <div className="grid h-4/6 place-items-center">{msg}</div>;
  }

  return (
    <div className="mt-4 mx-auto half-height overflow-y-auto w-full lg:w-6/12">
      <table className="relative text-lg text-left text-gray-400 justify-between w-full half-height">
        <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <TableHeader colSpan={2}>Player</TableHeader>
            <TableHeader colSpan={2}>Split</TableHeader>
            <TableHeader colSpan={2}>Time</TableHeader>
          </tr>
        </thead>
        <tbody>
          {eventPaces.map((pace: Pace, idx: number) => (
            <PaceEntry key={idx} {...pace} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
