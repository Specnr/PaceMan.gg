"use client"
import PaceEntry from "@/components/PaceEntry";
import TableHeader from "@/components/TableHeader";
import Pace from "@/components/interfaces/Pace";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/get-runs", fetcher);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="grid h-screen place-items-center">
      <table className="table-auto text-lg text-left w-6/12 text-gray-400">
        <thead className="text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <TableHeader colSpan={2}>Player</TableHeader>
            <TableHeader>Split</TableHeader>
            <TableHeader>Time</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((pace: Pace, idx: number) => (
            <PaceEntry
              key={idx}
              nickname={pace.nickname}
              uuid={pace.uuid}
              time={pace.time}
              split={pace.split}
              twitch={pace.twitch}
              isLast={idx === (data.length - 1)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};