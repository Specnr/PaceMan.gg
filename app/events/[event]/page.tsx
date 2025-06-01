"use client";
import { fetcher } from "@/public/functions/converters";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import Event from "@/components/interfaces/Event";
import EventTable from "@/components/Events/EventTable";
import { msToDate } from "@/public/functions/frontendConverters";
import Title from "@/components/Title";
import DateTimeListTooltip from "@/components/Events/DateTimeListTooltip";
import { Select, SelectItem } from "@nextui-org/react";
import PaceLeaderboard from "@/components/Leaderboards/PaceLeaderboard";
import WhitelistTable from "@/components/Events/WhitelistTable";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { MessageSpinner } from "@/components/MessageSpinner";

export default function Events({ params }: { params: { event: string } }) {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR<Event[]>("/api/get-events", fetcher, { revalidateOnFocus: false });
  const router = useRouter();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<string>("results");

  useEffect(() => {
    if (!error && !isLoading && events && !selectedEvent) {
      let foundEvent: Event[] = [];
      if (params.event !== "latest") {
        foundEvent = events.filter((e) => e.vanity === params.event);
      } else if (events.length > 0) {
        // Get the newest start date in the past
        let minEvent = events[events.length - 1];
        events.forEach((e) => {
          if (
            dayjs().valueOf() >= e.starts[0] * 1000 &&
            e.starts[0] > minEvent.starts[0]
          ) {
            minEvent = e;
          }
        });
        foundEvent = [minEvent];
      }

      if (foundEvent?.length === 1) {
        setSelectedEvent(foundEvent[0] as Event);
      }
      setIsLoadingEvent(false);
    }
  }, [params, error, events, isLoading, selectedEvent]);

  let msg = null;
  if (error || (!isLoading && !events)) msg = "failed to load";
  if (isLoadingEvent || isLoading || !events)
    msg = (
      <div className="flex flex-col items-center justify-center py-auto">
        <MessageSpinner />
      </div>
    );
  if (!isLoading && !isLoadingEvent && !selectedEvent) msg = "invalid event id";

  if (msg !== null) {
    return (
      <div className="container-height grid place-items-center my-auto">{msg}</div>
    );
  }

  const eventList = events ? events : [];

  // Get icon based on view mode
  const getViewIcon = () => {
    switch (viewMode) {
      case "pace":
        return faChartLine;
      case "whitelist":
        return faUsers;
      default:
        return faCalendarAlt;
    }
  };

  return (
    <div className="flex flex-col h-full fade-in">
      <Title
        titleOverrite={selectedEvent ? selectedEvent.name : undefined}
        link={
          selectedEvent && selectedEvent.host
            ? `https://twitch.tv/${selectedEvent.host}`
            : undefined
        }
      />

      <div className="flex justify-center mb-4 -mt-4">
        {selectedEvent && (
          <div className="group w-fit relative flex justify-center">
            <DateTimeListTooltip
              starts={selectedEvent.starts}
              ends={selectedEvent.ends}
            >
              <p className="text-gray-300">
                {msToDate(selectedEvent.starts[0])} -{" "}
                {msToDate(selectedEvent.ends[selectedEvent.ends.length - 1])}
              </p>
            </DateTimeListTooltip>
          </div>
        )}
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden flex-1 max-w-5xl mx-auto w-full">
        <div className="p-3 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center mb-3">
            <FontAwesomeIcon icon={getViewIcon()} className="text-purple-400 mr-2" />
            <h2 className="text-xl font-medium">
              {viewMode === "pace" ? "Event Pace" : viewMode === "whitelist" ? "Event Whitelist" : "Event Results"}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              className="w-full sm:w-80"
              variant="bordered"
              size="sm"
              defaultSelectedKeys={[selectedEvent!.vanity]}
              onChange={(evt) =>
                router.push(
                  `/events/${eventList.filter((e) => e.vanity === evt.target.value)[0]
                    .vanity
                  }`
                )
              }
              value={selectedEvent ? selectedEvent.vanity : ""}
              classNames={{
                trigger: "bg-gray-800/30"
              }}
            >
              {eventList.map((e) => (
                <SelectItem value={e.vanity} key={e.vanity}>
                  {e.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              className="w-full sm:w-40"
              variant="bordered"
              size="sm"
              defaultSelectedKeys={["results"]}
              onChange={(evt) => setViewMode(evt.target.value)}
              classNames={{
                trigger: "bg-gray-800/30"
              }}
            >
              <SelectItem key="results" value="results">
                Results
              </SelectItem>
              <SelectItem key="pace" value="pace">
                Pace
              </SelectItem>
              <SelectItem key="whitelist" value="whitelist">
                Whitelist
              </SelectItem>
            </Select>
          </div>
        </div>

        <div className="overflow-auto h-full">
          {!selectedEvent ? (
            <div className="grid h-full place-items-center">No Event Selected</div>
          ) : viewMode === "pace" ? (
            <PaceLeaderboard whitelist={new Set(selectedEvent.whitelist)} />
          ) : viewMode === "whitelist" ? (
            <WhitelistTable whitelist={selectedEvent.whitelist} />
          ) : (
            <EventTable event={selectedEvent} />
          )}
        </div>
      </div>
    </div>
  );
}
