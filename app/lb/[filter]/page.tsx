"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Switch, Select, SelectItem, Tooltip, Input } from "@nextui-org/react";

import Leaderboard from "@/components/Leaderboards/Leaderboard";
import Title from "@/components/Title";
import TrophyLeaderboard from "@/components/Leaderboards/TrophyLeaderboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const filterTypes = new Set(["daily", "weekly", "monthly", "all", "trophy"]);

const filterToDisplayName = (filter: string) => {
  if (filter === "all" || !filterTypes.has(filter)) return "Lifetime";
  return filter.charAt(0).toUpperCase() + filter.slice(1);
};

export default function LeaderboardPage({
  params,
}: {
  params: { filter: string };
}) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const [date, setDate] = useState(dayjs());

  if (!filterTypes.has(params.filter)) {
    return router.push("/lb/all");
  }

  const filters = ["daily", "weekly", "monthly", "all", "trophy"];
  const isTrophy = params.filter === "trophy";
  const isAll = params.filter === "all";

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title titleOverrite={`PaceMan Leaderboard`} />
        <div className="px-4 pt-2 mx-auto flex lg:w-2/4 gap-4 justify-center">
          {!isTrophy && !isAll && (
            <Tooltip
              showArrow
              content={`Localized day start: ${dayjs()
                .tz("America/Toronto")
                .startOf("day")
                .tz(dayjs.tz.guess())
                .format("HH:mm")}`}
            >
              <div className="w-0 invisible md:visible md:w-[180px]">
                <Input
                  type="date"
                  size="sm"
                  variant="bordered"
                  value={date.format("YYYY-MM-DD")}
                  onChange={(e) => setDate(dayjs(e.target.value))}
                />
              </div>
            </Tooltip>
          )}
          <Select
            className="max-w-sm"
            variant="bordered"
            size="sm"
            defaultSelectedKeys={[params.filter]}
            value={params.filter}
            onChange={(e) =>
              e.target.value !== "" && router.push(`/lb/${e.target.value}`)
            }
          >
            {filters.map((filter) => (
              <SelectItem value={filter} key={filter}>
                {filterToDisplayName(filter)}
              </SelectItem>
            ))}
          </Select>
          {isTrophy ? (
            <Tooltip
              showArrow
              content={
                <div className="text-left">
                  <p>Daily = 1 point</p>
                  <p>Weekly = 3 points</p>
                  <p>Monthly = 5 points</p>
                  <p>PB will be used to break ties</p>
                </div>
              }
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="text-xl pl-2 pt-4"
              />
            </Tooltip>
          ) : (
            <Switch
              color="secondary"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
            >
              <span>Show All</span>
            </Switch>
          )}
        </div>
      </div>
      {isTrophy ? (
        <TrophyLeaderboard />
      ) : (
        <Leaderboard
          filter={params.filter}
          removeDupes={!showAll}
          date={(date ?? dayjs()).tz("America/Toronto").valueOf()}
        />
      )}
    </div>
  );
}
