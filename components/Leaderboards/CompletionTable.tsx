import TableHeader from "@/components/TableHeader";
import Completion from "@/components/interfaces/Completion";
import CompletionEntry from "./CompletionEntry";
import { Spinner } from "@nextui-org/react";

export default function EventTable({
  completions,
  isLoading,
  error,
}: {
  completions: Completion[];
  isLoading: boolean;
  error: boolean;
}) {
  if (isLoading || !completions)
    return (
      <div className="grid h-4/6 place-items-center">
        <Spinner color="secondary" size="lg" />
      </div>
    );

  return error || completions.length === 0 ? (
    <div className="grid h-4/6 place-items-center">
      There are no completions yet...
    </div>
  ) : (
    <div className="mt-2 mx-auto half-height overflow-y-auto w-full lg:w-2/4">
      <table className="relative text-lg text-left text-gray-400 justify-between w-full">
        <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <TableHeader>Place</TableHeader>
            <TableHeader colSpan={2}>Player</TableHeader>
            <TableHeader>Time</TableHeader>
          </tr>
        </thead>
        <tbody className="text-medium lg:text-lg">
          {completions.map((completion: Completion, idx: number) => (
            <CompletionEntry
              key={idx}
              placement={idx + 1}
              nickname={completion.nickname}
              uuid={completion.uuid}
              eventList={
                completion.eventList ?? [{ eventId: 7, time: completion.time! }]
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
