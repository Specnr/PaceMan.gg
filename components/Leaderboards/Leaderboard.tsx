import useSWR from "swr";

import { fetcher } from "@/public/functions/converters";
import CompletionTable from "../CompletionTable";

const filterToId = (filter: string) => {
  switch (filter) {
    case "daily":
      return 0;
    case "weekly":
      return 1;
    case "monthly":
      return 2;
    default:
      return 3;
  }
};

export default function EventTable({ filter }: { filter: string }) {
  const { data, isLoading, error } = useSWR(
    `/api/get-leaderboard?filterId=${filterToId(filter)}&removeDuplicates=1`,
    fetcher
  );

  return (
    <CompletionTable completions={data} isLoading={isLoading} error={error} />
  );
}
