import useSWR from "swr";

import Event from "@/components/interfaces/Event";
import { fetcher } from "@/public/functions/converters";
import CompletionTable from "../Leaderboards/CompletionTable";

export default function EventTable({ event }: { event: Event }) {
  const { data, isLoading, error } = useSWR(
    `/api/get-event-completions?eventId=${event._id}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <CompletionTable completions={data} isLoading={isLoading} error={error} />
  );
}
