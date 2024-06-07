export interface Event {
  name: string;
  time: number;
}

export interface Pace {
  nickname: string;
  split?: number;
  splitName: string;
  eventList: Event[];
  time: number;
  uuid: string;
  twitch: string | null;
  lastUpdated: number;
  isHighQuality: boolean;
  itemEstimates?: any;
}
