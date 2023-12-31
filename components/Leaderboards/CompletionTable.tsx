import TableHeader from "@/components/TableHeader";
import Completion from "@/components/interfaces/Completion";
import CompletionEntry from "./CompletionEntry";
import { Spinner } from "@nextui-org/react";
import { SimpleCompletionEntry } from "./SimpleCompletionEntry";

export default function EventTable({
  completions,
  isLoading = false,
  error = false,
  simplify = false,
}: {
  completions: Completion[];
  isLoading?: boolean;
  error?: boolean;
  simplify?: boolean;
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
    <div
      className={`mt-2 half-height overflow-y-auto w-full${
        simplify ? "" : " lg:w-2/4 mx-auto"
      }`}
    >
      <table className="relative text-lg text-left text-gray-400 justify-between w-full">
        <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            {!simplify && <TableHeader>Place</TableHeader>}
            <TableHeader colSpan={simplify ? 1 : 2}>
              {simplify ? "Time" : "Player"}
            </TableHeader>
            <TableHeader>{simplify ? "Submitted" : "Time"}</TableHeader>
          </tr>
        </thead>
        <tbody className="text-medium lg:text-lg">
          {completions.map((completion: Completion, idx: number) => {
            const el = completion.eventList ?? [
              { eventId: 7, time: completion.time! },
            ];
            return simplify ? (
              <SimpleCompletionEntry
                eventList={el}
                submitted={completion.submitted}
              />
            ) : (
              <CompletionEntry
                key={idx}
                placement={idx + 1}
                nickname={completion.nickname}
                uuid={completion.uuid}
                submitted={completion.submitted}
                eventList={el}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
