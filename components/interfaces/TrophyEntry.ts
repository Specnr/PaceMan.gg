export interface TrophyEntry {
  uuid: string;
  nickname: string;
  twitchId: string;
  alt: string | null;
  daily: number;
  weekly: number;
  monthly: number;
  score: number;
  pb: number;
  bonus: number;
}
