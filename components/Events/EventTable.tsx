import useSWR from "swr";

import Event from "@/components/interfaces/Event";
import { fetcher } from "@/public/functions/converters";
import CompletionTable from "../Leaderboards/CompletionTable";
import RankingTable from "../Leaderboards/RankingTable";

export default function EventTable({ event }: { event: Event }) {
  const { data, isLoading, error } = useSWR(
    `/api/get-event-completions?eventId=${event._id}&usePoints=${!!event.points}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    event.points ? (
      <RankingTable rankings={data} isLoading={isLoading} error={error} />
    ) : (<CompletionTable completions={data} isLoading={isLoading} error={error} />)
  );
}
