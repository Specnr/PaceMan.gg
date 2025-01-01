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
import { createDateFromInput } from "@/public/functions/frontendConverters";

dayjs.extend(utc);
dayjs.extend(timezone);

const filterTypes = new Set(["daily", "weekly", "monthly", "all", "trophy"]);
const trophyOptions = ["current", "season 1", "season 2", "season 3"]
const filters = ["daily", "weekly", "monthly", "all", "trophy"];

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
  const [season, setSeason] = useState(trophyOptions[0]);
  const [date, setDate] = useState(dayjs());

  if (!filterTypes.has(params.filter)) {
    return router.push("/lb/all");
  }

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
                  value={date.tz(dayjs.tz.guess()).format("YYYY-MM-DD")}
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
            <>
              <Select
                className="max-w-xs"
                variant="bordered"
                size="sm"
                defaultSelectedKeys={[season]}
                value={season}
                onChange={(e) =>
                  e.target.value !== "" && setSeason(e.target.value)
                }
              >
                {trophyOptions.map((to) => (
                  <SelectItem value={to} key={to}>
                    {to.charAt(0).toUpperCase() + to.slice(1)}
                  </SelectItem>
                ))}
              </Select>
              <Tooltip
                showArrow
                content={
                  <div className="text-left">
                    <p>Daily = 1 point</p>
                    <p>Weekly = 3 points</p>
                    <p>Monthly = 5 points</p>
                    <p>Sub-10 = 1 bonus point</p>
                    <p>Sub-9 = 2 bonus point</p>
                    <p>Sub-8 = 3 bonus point</p>
                    <p>World Record = 5 bonus point</p>
                    <p>Personal Best is the tie breaker</p>
                  </div>
                }
              >
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="text-xl pl-2 pt-4"
                />
              </Tooltip>
            </>
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
        <TrophyLeaderboard season={season} />
      ) : (
        <Leaderboard
          filter={params.filter}
          removeDupes={!showAll}
          date={createDateFromInput(date)}
        />
      )}
    </div>
  );
}
