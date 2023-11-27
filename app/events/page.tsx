"use client"
import { fetcher } from "@/public/functions/converters";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import Event from "@/components/interfaces/Event"
import EventTable from "@/components/Events/EventTable";
import { msToDate } from "@/public/functions/frontendConverters";
import Title from "@/components/Title";
import Loading from "@/components/Loading";

export default function Events() {
  const { data: events, error, isLoading } = useSWR<Event[]>("/api/get-events", fetcher)
  const searchParams = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (searchParams && !error && !isLoading && events && !selectedEvent) {
      const foundEvent = events.filter((e: any) => e._id === searchParams.get("eventId"));
      if (foundEvent.length === 1) {
        setSelectedEvent(foundEvent[0] as Event);
      }
    }
  }, [searchParams, error, events, isLoading, selectedEvent])

  let msg = null;
  if (error || (!isLoading && !events)) msg = "failed to load";
  if (isLoading || !searchParams || !events) msg = <Loading />;
  if (searchParams && !selectedEvent && searchParams.get("eventId") !== null) msg = "invalid event id";

  const eventList = events ? events : [];
  return (
    <div className="container-height">
      <div className="pt-16">
        <Title titleOverrite={selectedEvent ? selectedEvent.name : undefined} />
        {selectedEvent && (
          <p className="pb-2">
            {msToDate(selectedEvent.starts[0])} - {msToDate(selectedEvent.ends[selectedEvent.ends.length-1])}
          </p>
        )}
        <select
          onChange={evt => setSelectedEvent(eventList.filter((e) => e._id === evt.target.value)[0])}
          className="
            md:w-80
            mx-auto
            bg-gray-50 border border-gray-300
            text-gray-900 text-sm rounded-lg
            block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white">
              <option className="font-sans">Choose an event</option>
          {
            eventList.map(e => (<option className="font-sans" value={e._id} key={e._id}>{e.name}</option>))
          }
        </select>
      </div>
      <div className="grid h-4/6 place-items-center">
        { !selectedEvent ? <p>No event selected...</p> : <EventTable event={selectedEvent} /> }
      </div>
    </div>
  );
}