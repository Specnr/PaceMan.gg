"use client";
import { Spinner } from "@nextui-org/react";
import AAPaceEntry from "../AA/AAPaceEntry";
import { AAPace } from "../interfaces/Pace";
import useSWR from "swr";
import { AAPaceSort, apiToAAPace } from "@/public/functions/converters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const fetcher = async (url: string) => {
  const data = await fetch(url).then((res) => res.json());
  const paces = (await apiToAAPace(data)).sort(AAPaceSort);
  return paces;
};

export default function AAPaceLeaderboard() {
  const { data, error, isLoading } = useSWR(
    "https://paceman.gg/api/ars/aa/liveruns",
    fetcher,
    {
      refreshWhenHidden: true,
      refreshInterval: 1000,
    }
  );

  // Loading and error states
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 text-3xl mb-4" />
        <p className="text-gray-300">Failed to load pace data</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Spinner color="secondary" size="lg" />
        <p className="text-gray-400 mt-4">Loading pace data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-300 text-lg mb-2">No one is currently on pace...</p>
        <p className="text-gray-500 text-sm">Check back soon</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-y-auto max-h-[50vh] pb-4">
        <div className="grid grid-cols-[120px_minmax(0,1fr)_80px] lg:grid-cols-[200px_minmax(0,1fr)_1fr_80px] text-xs uppercase tracking-wider text-gray-400 px-4 py-2">
          <div>Player</div>
          <div>Advancements</div>
          <div className="hidden lg:block">Missing</div>
          <div>Time</div>
        </div>

        {data.map((pace: AAPace, idx: number) => (
          <div key={`aa-${idx}`} className="border-b border-gray-700/50 last:border-0">
            <AAPaceEntry {...pace} />
          </div>
        ))}
      </div>
    </div>
  );
}
