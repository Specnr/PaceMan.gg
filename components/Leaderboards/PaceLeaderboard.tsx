"use client";
import PaceEntry from "../PaceEntry";
import { Pace, PaceSettings } from "../interfaces/Pace";
import useSWR from "swr";
import { apiToPace, paceSort } from "@/public/functions/converters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { MessageSpinner } from "../MessageSpinner";

const fetcher = async (url: string) => {
  const data = await fetch(url).then((res) => res.json());
  const paces = (await apiToPace(data)).sort(paceSort);
  return paces;
};

export default function PaceLeaderboard({
  whitelist,
  settings
}: {
  whitelist?: Set<string>;
  settings?: PaceSettings;
}) {
  const isAllVersion = settings?.version === "All";

  const { data, error, isLoading } = useSWR(
    `https://paceman.gg/api/ars/liveruns?gameVersion=${(settings?.version || "All").toLowerCase()}&liveOnly=${settings?.liveOnly || false}`,
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
        <MessageSpinner />
      </div>
    );
  }

  if (!eventPaces || eventPaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-300 text-lg mb-2">No one is currently on pace...</p>
        <p className="text-gray-500 text-sm">Check back soon or adjust your filter settings</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-y-auto max-h-[50vh] pb-4">
        <div className={`grid ${isAllVersion
          ? 'grid-cols-[1fr_1fr_80px] md:grid-cols-[1fr_1fr_120px_180px]'
          : 'grid-cols-[1fr_1fr_80px] md:grid-cols-[1fr_1fr_240px]'} text-xs uppercase tracking-wider text-gray-400 px-4 py-2`}>
          <div>Player</div>
          <div>Split</div>
          {isAllVersion && <div className="hidden md:block">Version</div>}
          <div>Time</div>
        </div>

        {eventPaces.map((pace: Pace, idx: number) => (
          <div key={idx} className="border-b border-gray-700/50 last:border-0">
            <PaceEntry {...pace} showVersion={isAllVersion} />
          </div>
        ))}
      </div>
    </div>
  );
}
