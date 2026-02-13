import LeaderboardClient from "./LeaderboardClient";

export async function generateStaticParams() {
  return [
    { filter: "daily" },
    { filter: "weekly" },
    { filter: "monthly" },
    { filter: "all" },
    { filter: "trophy" },
  ];
}

export const dynamicParams = false;

export default async function LeaderboardPage({
  params,
}: {
  params: Promise<{ filter: string }>;
}) {
  const { filter } = await params;
  return <LeaderboardClient filter={filter} />;
}
