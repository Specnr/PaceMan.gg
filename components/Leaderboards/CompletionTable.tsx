"use client";
import Completion from "@/components/interfaces/Completion";
import CompletionEntry from "./CompletionEntry";
import { Spinner } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function CompletionTable({
  completions,
  isLoading = false,
  error = false,
}: {
  completions: Completion[];
  isLoading?: boolean;
  error?: boolean;
}) {
  // Loading and error states
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 text-3xl mb-4" />
        <p className="text-gray-300">Failed to load completion data</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  if (isLoading || !completions) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Spinner color="secondary" size="lg" />
        <p className="text-gray-400 mt-4">Loading completion data...</p>
      </div>
    );
  }

  if (completions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-300 text-lg mb-2">There are no completions yet...</p>
        <p className="text-gray-500 text-sm">Check back soon or adjust your filter settings</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-y-auto max-h-[50vh] pb-4">
        <div className="grid grid-cols-[80px_1fr_80px] md:grid-cols-[80px_1fr_240px] text-xs uppercase tracking-wider text-gray-400 px-4 py-2">
          <div>Place</div>
          <div>Player</div>
          <div>Time</div>
        </div>

        {completions.map((completion: Completion, idx: number) => {
          const el = completion.eventList ?? [
            { eventId: 7, time: completion.time! },
          ];
          return (
            <div key={completion._id} className="border-b border-gray-700/50 last:border-0">
              <CompletionEntry
                placement={idx + 1}
                nickname={completion.nickname}
                uuid={completion.uuid}
                submitted={completion.submitted}
                eventList={el}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
