"use client"
import useSWR from "swr";

import PaceEntry from "@/components/PaceEntry";
import TableHeader from "@/components/TableHeader";
import Title from "@/components/Title";
import Pace from "@/components/interfaces/Pace";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/get-runs", fetcher, { refreshWhenHidden: true, refreshInterval: 1000 });

  let msg = null;
  if (error) msg =  <div>failed to load</div>;
  if (isLoading) msg = <div>Loading...</div>;

  return (
    <>
      <div className="pt-10">
        <Title />
        <p className="pt-4 invisible md:visible">
          The best Minecraft Speedrunning pace in real-time
        </p>
      </div>
      
      <div className="half-height overflow-y-auto w-full md:w-6/12">
        {
          msg !== null ? msg: (
            data.length === 0 ? <div>No one is currently on pace...</div> : (
              <table className="relative text-lg text-left text-gray-400 justify-between w-full half-height">
                <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
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
                      splitName={pace.splitName}
                      twitch={pace.twitch}
                      isLast={idx === (data.length - 1)}
                    />
                  ))}
                </tbody>
              </table>
            )
          )
        }
      </div>
    </>
  );
};