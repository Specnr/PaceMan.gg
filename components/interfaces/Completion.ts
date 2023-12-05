export interface EventItem {
  eventId: number;
  time: number;
}

export default interface Completion {
  _id: string;
  uuid: string;
  time?: number;
  eventList?: EventItem[];
  nickname: string;
}
