import EventsClient from "./EventsClient";
import Event from "@/components/interfaces/Event";

export async function generateStaticParams() {
  try {
    const events: Event[] = await (
      await fetch("https://paceman.gg/api/cs/eventlist")
    ).json();
    return events.map((e) => ({ event: e.vanity }));
  } catch {
    return [{ event: "latest" }];
  }
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const { event } = await params;
  return <EventsClient event={event} />;
}
