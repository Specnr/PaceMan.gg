"use client";
import useSWR from "swr";

import PaceEntry from "@/components/PaceEntry";
import TableHeader from "@/components/TableHeader";
import Title from "@/components/Title";
import { Pace } from "@/components/interfaces/Pace";
import { Spinner } from "@nextui-org/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/get-runs", fetcher, {
    refreshWhenHidden: true,
    refreshInterval: 1000,
  });

  let msg = null;
  if (error) msg = "failed to load";
  else if (isLoading) msg = <Spinner />;
  else if (data.length === 0) msg = "No one is currently on pace...";

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title />
        <p className="invisible h-0 md:h-auto md:pt-2 md:visible">
          The best Minecraft Speedrunning pace in real-time
        </p>
      </div>
      {msg !== null ? (
        <div className="grid h-4/6 place-items-center">{msg}</div>
      ) : (
        <div className="mt-4 mx-auto half-height overflow-y-auto w-full md:w-6/12">
          <table className="relative text-lg text-left text-gray-400 justify-between w-full half-height">
            <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
              <tr>
                <TableHeader colSpan={2}>Player</TableHeader>
                <TableHeader>Split</TableHeader>
                <TableHeader colSpan={2}>Time</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.map((pace: Pace, idx: number) => (
                <PaceEntry key={idx} {...pace} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
