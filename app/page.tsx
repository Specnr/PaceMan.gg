"use client";
import useSWR from "swr";

import PaceEntry from "@/components/PaceEntry";
import TableHeader from "@/components/TableHeader";
import Title from "@/components/Title";
import { Pace } from "@/components/interfaces/Pace";
import { Spinner, Tooltip } from "@nextui-org/react";
import { apiToPace, paceSort } from "@/public/functions/converters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const fetcher = async (url: string) => {
  const data = await fetch(url).then((res) => res.json());
  const paces = (await apiToPace(data)).sort(paceSort);
  return paces;
};

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://paceman.gg/api/ars/liveruns",
    fetcher,
    {
      refreshWhenHidden: true,
      refreshInterval: 1000,
    }
  );

  let msg = null;
  if (error) msg = "failed to load";
  else if (isLoading) msg = <Spinner color="secondary" size="lg" />;
  else if (!data || data.length === 0) msg = "No one is currently on pace...";

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title />
        <p className="invisible h-0 lg:h-auto lg:pt-2 lg:visible">
          The best Minecraft Speedrunning pace in real-time
          <Tooltip
            showArrow
            content={
              <div className="text-left">
                <p>Click on time {"->"} Splits</p>
                <p>Click on head {"->"} User profile</p>
                <p>Hover over time {"->"} Current time</p>
                <p>Bolded {"->"} Good pace, will prioritize</p>
                <p>Blue name {"->"} Live, click to watch</p>
              </div>
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} className="pl-2" />
          </Tooltip>
        </p>
      </div>
      {msg !== null ? (
        <div className="grid h-4/6 place-items-center">{msg}</div>
      ) : (
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
              {data!.map((pace: Pace, idx: number) => (
                <PaceEntry key={idx} {...pace} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
