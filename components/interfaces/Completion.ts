export interface EventItem {
  eventId: number;
  time: number;
}

export default interface UserCompletion {
  time: number;
  eventList?: EventItem[];
  submitted: number;
}

export default interface Completion {
  _id: string;
  uuid: string;
  time: number;
  eventList?: EventItem[];
  nickname: string;
}

export interface RankingCompletion {
  time: number;
  points: number;
}

export interface Ranking {
  uuid: string;
  nickname: string;
  totalPoints: number;
  completions: RankingCompletion[];
}
