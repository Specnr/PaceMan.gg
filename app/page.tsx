"use client"
import PaceEntry from "@/components/PaceEntry";
import Pace from "@/components/interfaces/Pace";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/get-runs", fetcher);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="grid h-screen place-items-center">
      <table className="table-auto text-left w-96">
        <thead>
          <tr>
            <th colSpan={2}>Player</th>
            <th>Split</th>
            <th>Time</th>
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};