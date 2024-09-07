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
}

export interface AAPace {
  completed: Event[];
  context: AAContext;
  currentTime: number;
  uuid: string;
  twitch: string | null;
  lastUpdated: number;
  nickname?: string;
  criterias: AdvancementCriterias;
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
