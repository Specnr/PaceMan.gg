import { EndgameMissing, JungleMissing, MesaMissing, MushroomMissing, PhantomsMissing, SnowyMissing, ThunderMissing } from "./AAEnums";

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
  gameVersion: string;
}

export interface AAItems {
  has_enchanted_golden_apple: boolean;
  skulls: number;
};

export interface AAPace {
  completed: Event[];
  context: AAContext;
  currentTime: number;
  uuid: string;
  twitch: string | null;
  lastUpdated: number;
  nickname?: string;
  criterias: AdvancementCriterias;
  items: AAItems;
}

export interface AdvancementCriterias {
  biomes: string[];
  monstersKilled: string[];
  animalsBred: string[];
  catsTamed: string[];
  foodEaten: string[];
}

export interface AAContext {
  shells: number;
  mesa: MesaMissing[];
  snowy: SnowyMissing[];
  jungle: JungleMissing[];
  mushroom: MushroomMissing[];
  phantoms: PhantomsMissing[];
  thunder: ThunderMissing[];
  endgame: EndgameMissing[];
}

export interface PaceSettings {
  version: string;
  liveOnly: boolean;
}
