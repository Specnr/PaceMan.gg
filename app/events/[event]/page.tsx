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
import { Select, SelectItem, Spinner, Switch } from "@nextui-org/react";
import PaceLeaderboard from "@/components/Leaderboards/PaceLeaderboard";
import dayjs from "dayjs";

export default function Events({ params }: { params: { event: string } }) {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR<Event[]>("/api/get-events", fetcher, { revalidateOnFocus: false });
  const router = useRouter();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState<boolean>(true);
  const [paceTable, setPaceTable] = useState(false);

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
    msg = <Spinner color="secondary" size="lg" />;
  if (!isLoading && !isLoadingEvent && !selectedEvent) msg = "invalid event id";

  if (msg !== null) {
    return (
      <div className="container-height grid place-items-center">{msg}</div>
    );
  }

  const eventList = events ? events : [];
  return (
    <div className="container-height">
      <div className="pt-16">
        <Title
          titleOverrite={selectedEvent ? selectedEvent.name : undefined}
          link={
            selectedEvent && selectedEvent.host
              ? `https://twitch.tv/${selectedEvent.host}`
              : undefined
          }
        />
        {selectedEvent && (
          <div className="group w-fit mx-auto relative flex justify-center">
            <DateTimeListTooltip
              starts={selectedEvent.starts}
              ends={selectedEvent.ends}
            >
              <p className="pb-2 pt-4">
                {msToDate(selectedEvent.starts[0])} -{" "}
                {msToDate(selectedEvent.ends[selectedEvent.ends.length - 1])}
              </p>
            </DateTimeListTooltip>
          </div>
        )}

        <div className="px-4 pt-2 mx-auto flex lg:w-2/4 gap-4 justify-center">
          <Select
            className="max-w-sm"
            variant="bordered"
            size="sm"
            defaultSelectedKeys={[selectedEvent!.vanity]}
            onChange={(evt) =>
              router.push(
                `/events/${
                  eventList.filter((e) => e.vanity === evt.target.value)[0]
                    .vanity
                }`
              )
            }
            value={selectedEvent ? selectedEvent.vanity : ""}
          >
            {eventList.map((e) => (
              <SelectItem value={e.vanity} key={e.vanity}>
                {e.name}
              </SelectItem>
            ))}
          </Select>
          <Switch
            color="secondary"
            checked={paceTable}
            onChange={(e) => setPaceTable(e.target.checked)}
          >
            <span>Pace</span>
          </Switch>
        </div>
      </div>
      {!selectedEvent ? (
        <div className="grid h-4/6 place-items-center">No Event Selected</div>
      ) : paceTable ? (
        <PaceLeaderboard whitelist={new Set(selectedEvent.whitelist)} />
      ) : (
        <EventTable event={selectedEvent} />
      )}
    </div>
  );
}
