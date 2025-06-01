"use client";
import { Ranking } from "@/components/interfaces/Completion";
import RankingTableEntry from "./RankingTableEntry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { MessageSpinner } from "../MessageSpinner";

export default function RankingTable({
  rankings,
  isLoading = false,
  error = false,
}: {
  rankings: Ranking[];
  isLoading?: boolean;
  error?: boolean;
}) {
  // Loading and error states
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 text-3xl mb-4" />
        <p className="text-gray-300">Failed to load ranking data</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  if (isLoading || !rankings) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <MessageSpinner />
      </div>
    );
  }

  if (rankings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-300 text-lg mb-2">There are no rankings yet...</p>
        <p className="text-gray-500 text-sm">Check back soon or adjust your filter settings</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-y-auto max-h-[50vh] pb-4">
        <div className="grid grid-cols-[80px_1fr_80px_80px] md:grid-cols-[80px_1fr_80px_160px] text-xs uppercase tracking-wider text-gray-400 px-4 py-2">
          <div>Place</div>
          <div>Player</div>
          <div>Points</div>
          <div>Time</div>
        </div>

        {rankings.map((ranking: Ranking, idx: number) => (
          <div key={`ranking-${idx}`} className="border-b border-gray-700/50 last:border-0">
            <RankingTableEntry ranking={ranking} placement={idx + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
