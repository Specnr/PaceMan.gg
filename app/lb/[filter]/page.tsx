"use client";
import Leaderboard from "@/components/Leaderboards/Leaderboard";
import Title from "@/components/Title";
import Link from "next/link";
import { redirect } from "next/navigation";

const filterTypes = new Set(["daily", "weekly", "monthly", "all"]);

const filterToDisplayName = (filter: string) => {
  if (filter === "all" || !filterTypes.has(filter)) return "All-Time";
  return filter.charAt(0).toUpperCase() + filter.slice(1);
};

export default function LeaderboardPage({
  params,
}: {
  params: { filter: string };
}) {
  if (!filterTypes.has(params.filter)) {
    return redirect("/lb/all");
  }

  const LeaderboardButton = ({ filter }: { filter: string }) => (
    <>
      <Link
        className={`text-sm px-8 md:text-base ${
          params.filter === filter ? "font-semibold italic" : "hover:underline"
        }`}
        href={`/lb/${filter}`}
      >
        {filterToDisplayName(filter)}
      </Link>
      <span className="last:invisible">|</span>
    </>
  );

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title
          titleOverrite={`${filterToDisplayName(params.filter)} Leaderboard`}
        />
        <div className="pt-6">
          <LeaderboardButton filter="daily" />
          <LeaderboardButton filter="weekly" />
          <LeaderboardButton filter="monthly" />
          <LeaderboardButton filter="all" />
        </div>
      </div>
      <Leaderboard filter={params.filter} />
    </div>
  );
}
