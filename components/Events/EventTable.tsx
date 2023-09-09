import useSWR from "swr";

import Event from "@/components/interfaces/Event";
import { fetcher } from "@/public/functions/converters";
import TableHeader from "@/components/TableHeader";
import Completion from "@/components/interfaces/Completion";
import CompletionEntry from "../CompletionEntry";

export default function EventTable({ event }: { event: Event }) {
  const { data, isLoading, error } = useSWR(`/api/get-event-completions?eventId=${event._id}`, fetcher);

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="half-height overflow-y-auto w-full md:w-2/4">
      {
        (error || !data || data.length === 0) ? <div>There are no completions yet...</div> : (
          <table className="relative text-lg text-left text-gray-400 justify-between w-full half-height">
            <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
              <tr>
                <TableHeader>Placement</TableHeader>
                <TableHeader colSpan={2}>Player</TableHeader>
                <TableHeader>Time</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.map((completion: Completion, idx: number) => (
                <CompletionEntry
                  key={idx}
                  placement={idx+1}
                  nickname={completion.nickname}
                  uuid={completion.uuid}
                  time={completion.time}
                  isLast={idx === (data.length - 1)}
                />
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
}