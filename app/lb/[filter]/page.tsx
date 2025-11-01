"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Switch, Select, SelectItem, Tooltip, Input } from "@nextui-org/react";

import Leaderboard from "@/components/Leaderboards/Leaderboard";
import Title from "@/components/Title";
import TrophyLeaderboard from "@/components/Leaderboards/TrophyLeaderboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrophy, faRankingStar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createDateFromInput } from "@/public/functions/frontendConverters";

dayjs.extend(utc);
dayjs.extend(timezone);

const filterTypes = new Set(["daily", "weekly", "monthly", "all", "trophy"]);
const trophyOptions = ["current", "season 1", "season 2", "season 3", "season 4", "season 5"]
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
    <div className="flex flex-col h-full fade-in">
      <Title titleOverrite={`PaceMan Leaderboard`} />

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden flex-1 max-w-5xl mx-auto w-full">
        <div className="p-3 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center mb-3">
            <FontAwesomeIcon
              icon={isTrophy ? faTrophy : faRankingStar}
              className="text-purple-400 mr-2"
            />
            <h2 className="text-xl font-medium">{filterToDisplayName(params.filter)} Leaderboard</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              className="w-full sm:w-40"
              variant="bordered"
              size="sm"
              defaultSelectedKeys={[params.filter]}
              value={params.filter}
              onChange={(e) =>
                e.target.value !== "" && router.push(`/lb/${e.target.value}`)
              }
              classNames={{
                trigger: "bg-gray-800/30"
              }}
            >
              {filters.map((filter) => (
                <SelectItem value={filter} key={filter}>
                  {filterToDisplayName(filter)}
                </SelectItem>
              ))}
            </Select>

            {isTrophy ? (
              <Select
                className="w-full sm:w-40"
                variant="bordered"
                size="sm"
                defaultSelectedKeys={[season]}
                value={season}
                onChange={(e) =>
                  e.target.value !== "" && setSeason(e.target.value)
                }
                classNames={{
                  trigger: "bg-gray-800/30"
                }}
              >
                {trophyOptions.map((to) => (
                  <SelectItem value={to} key={to}>
                    {to.charAt(0).toUpperCase() + to.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            ) : !isAll ? (
              <Tooltip
                showArrow
                content={`Localized day start: ${dayjs()
                  .tz("America/Toronto")
                  .startOf("day")
                  .tz(dayjs.tz.guess())
                  .format("HH:mm")}`}
              >
                <div className="w-full sm:w-48 relative shadow-sm">
                  <Input
                    type="date"
                    size="sm"
                    classNames={{
                      base: "h-12 min-h-unit-12",
                      inputWrapper: "h-12 shadow-sm border-medium border-default-200 data-[hover=true]:border-default-400 rounded-small py-1.5 px-3 bg-gray-800/30",
                      input: "text-small text-foreground-500"
                    }}
                    value={date.tz(dayjs.tz.guess()).format("YYYY-MM-DD")}
                    onChange={(e) => setDate(dayjs(e.target.value))}
                  />
                </div>
              </Tooltip>
            ) : null}

            {!isTrophy && (
              <div className="flex items-center px-3 py-1.5 rounded-md ml-auto">
                <Switch
                  color="secondary"
                  checked={showAll}
                  onChange={(e) => setShowAll(e.target.checked)}
                >
                  <span>Show All</span>
                </Switch>
              </div>
            )}

            {isTrophy && (
              <Tooltip
                showArrow
                placement="bottom"
                content={
                  <div className="text-left p-2">
                    <p className="font-medium mb-1">Trophy Points:</p>
                    <p>• Daily = 1 point</p>
                    <p>• Weekly = 3 points</p>
                    <p>• Monthly = 5 points</p>
                    <p>• Sub-10 = 1 bonus point</p>
                    <p>• Sub-9 = 2 bonus point</p>
                    <p>• Sub-8 = 3 bonus point</p>
                    <p>• Sub-7 = 4 bonus point</p>
                    <p>• World Record = 5 bonus point</p>
                    <p>• Personal Best is the tie breaker</p>
                  </div>
                }
                className="bg-gray-900"
              >
                <button className="text-gray-300 hover:text-white transition-all p-2 rounded-full hover:bg-gray-700/50 ml-auto hidden md:block">
                  <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                </button>
              </Tooltip>
            )}
          </div>
        </div>

        <div className="overflow-auto h-full">
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
      </div>
    </div>
  );
}
