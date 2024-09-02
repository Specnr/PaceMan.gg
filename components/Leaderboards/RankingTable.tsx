import TableHeader from "@/components/TableHeader";
import { Ranking } from "@/components/interfaces/Completion";
import { Spinner } from "@nextui-org/react";
import RankingTableEntry from "./RankingTableEntry";

export default function RankingTable({
  rankings,
  isLoading = false,
  error = false,
}: {
  rankings: Ranking[];
  isLoading?: boolean;
  error?: boolean;
}) {
  if (isLoading || !rankings)
    return (
      <div className="grid h-4/6 place-items-center">
        <Spinner color="secondary" size="lg" />
      </div>
    );

  return error || rankings.length === 0 ? (
    <div className="grid h-4/6 place-items-center">
      There are no completions yet...
    </div>
  ) : (
    <div
      className={`mt-2 half-height overflow-y-auto w-full lg:w-2/4 mx-auto`}
    >
      <table className="relative text-lg text-left text-gray-400 justify-between w-full">
        <thead className="sticky top-0 text-sm uppercase bg-gray-700 text-gray-400">
          <tr>
            <TableHeader>Place</TableHeader>
            <TableHeader colSpan={2}>
              Player
            </TableHeader>
            <TableHeader>Points</TableHeader>
            <TableHeader>Time</TableHeader>
          </tr>
        </thead>
        <tbody className="text-medium lg:text-lg">
          {rankings.map((ranking: Ranking, idx: number) => <RankingTableEntry ranking={ranking} placement={idx+1} key={`ranking-${idx}`} />)}
        </tbody>
      </table>
    </div>
  );
}
