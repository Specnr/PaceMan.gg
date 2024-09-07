"use client";
import TableHeader from "@/components/TableHeader";
import { Spinner } from "@nextui-org/react";
import AAPaceEntry from "../AA/AAPaceEntry";
import { AAPace } from "../interfaces/Pace";
import useSWR from "swr";
import { AAPaceSort, apiToAAPace } from "@/public/functions/converters";

const fetcher = async (url: string) => {
  const data = await fetch(url).then((res) => res.json());
  const paces = (await apiToAAPace(data)).sort(AAPaceSort);
  return paces;
};

export default function AAPaceLeaderboard() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8001/api/ars/aa/liveruns",
    fetcher,
    {
      refreshWhenHidden: true,
      refreshInterval: 1000,
    }
  );

  let msg = null;
  if (error) msg = "failed to load";
  else if (isLoading) msg = <Spinner color="secondary" size="lg" />;
  else if (!data || data.length === 0)
    msg = "No one is currently on pace...";

  if (msg !== null) {
    return <div className="grid h-4/6 place-items-center">{msg}</div>;
  }

  return (
    <div className="mt-2 mx-auto half-height overflow-y-auto w-full lg:w-6/12">
      <table className="relative text-lg text-left text-gray-400 justify-between w-full half-height">
        <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <TableHeader colSpan={2}>Player</TableHeader>
            <TableHeader colSpan={2}>Advancement</TableHeader>
            <TableHeader colSpan={1}>Time</TableHeader>
            <TableHeader colSpan={1}><span className="invisible 2xl:visible">Missing</span></TableHeader>
          </tr>
        </thead>
        <tbody>
          {data!.map((pace: AAPace, idx: number) => (
            <AAPaceEntry key={`aa-${idx}`} {...pace} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
