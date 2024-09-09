import { EndgameMissing, JungleMissing, MesaMissing, MushroomMissing, PhantomsMissing, SnowyMissing, ThunderMissing } from "@/components/interfaces/AAEnums";

export const AA_STORY_ICON = "../images/aa_story.png";
export const AA_HUSBANDRY_ICON = "../images/aa_husbandry.png";
export const AA_ADVENTURE_ICON = "../images/aa_adventure.png";
export const AA_NETHER_ICON = "../images/aa_nether.png";
export const AA_END_ICON = "../images/aa_end.png";

export const AA_JUNGLE_ICON = "../images/aa_jungle.png";
export const AA_MESA_ICON = "../images/aa_mesa.png";
export const AA_SNOWY_ICON = "../images/aa_snowy.png";
export const AA_MUSHROOM_ICON = "../images/aa_mushroom.png";
export const AA_THUNDER_ICON = "../images/aa_thunder.png";
export const AA_PHANTOM_ICON = "../images/aa_phantom.png";
export const AA_ENDGAME_ICON = "../images/aa_endgame.png";

export const AA_COMPLETED_ICON = "../images/aa_completed.png";

export const advToIcon = (adv: string) => {
  const parent = adv.split("/")[0];
  switch (parent) {
    case "story":
      return AA_STORY_ICON;
    case "husbandry":
      return AA_HUSBANDRY_ICON;
    case "adventure":
      return AA_ADVENTURE_ICON;
    case "nether":
      return AA_NETHER_ICON;
    case "end":
      return AA_END_ICON;
    default:
      return AA_NETHER_ICON;
  };
};

export const nameToIcon = (name: string) => {
  switch (name) {
    case "jungle":
      return AA_JUNGLE_ICON;
    case "mesa":
      return AA_MESA_ICON;
    case "snowy":
      return AA_SNOWY_ICON;
    case "mushroom":
      return AA_MUSHROOM_ICON;
    case "thunder":
      return AA_THUNDER_ICON;
    case "phantom":
      return AA_PHANTOM_ICON;
    case "endgame":
      return AA_ENDGAME_ICON;
    default:
      return AA_JUNGLE_ICON;
  }
};

export const missingEnumToText = (missingEnum: number, category: string) => {
  switch (category) {
    case "jungle":

      switch (missingEnum as JungleMissing) {
        case JungleMissing.BIOMES:
          return "Not all biomes found";
        case JungleMissing.PANDA:
          return "Pandas not bred";
        case JungleMissing.OCELOT:
          return "Ocelot not bred";
        case JungleMissing.COOKIE:
          return "Cookie not eaten";
        default:
          return "BAD DATA...";
      }

    case "mesa":

      switch (missingEnum as MesaMissing) {
        case MesaMissing.BIOMES:
          return "Not all biomes found";
        case MesaMissing.CAVE_SPIDER:
          return "Cave Spider not killed";
        default:
          return "BAD DATA...";
      }

    case "snowy":

      switch (missingEnum as SnowyMissing) {
        case SnowyMissing.BIOMES:
          return "Not all biomes found";
        case SnowyMissing.STRAY:
          return "Stray not killed";
        case SnowyMissing.ZOMBIE_DOCTOR:
          return "Zombie Doctor not achieved";
        default:
          return "BAD DATA...";
      }

    case "mushroom":

      switch (missingEnum as MushroomMissing) {
        case MushroomMissing.BIOMES:
          return "Not all biomes found";
        case MushroomMissing.MOOSHROOM:
          return "Mooshroom not bred";
        default:
          return "BAD DATA...";
      }

    case "thunder":

      switch (missingEnum as ThunderMissing) {
        case ThunderMissing.TRIDENT:
          return "Trident not collected";
        case ThunderMissing.VVF:
          return "Very Very Frightening not achieved";
        default:
          return "BAD DATA...";
      }

    case "phantom":

      switch (missingEnum as PhantomsMissing) {
        case PhantomsMissing.PHANTOM:
          return "Phantom not killed";
        case PhantomsMissing.TWO_BIRDS:
          return "Two Birds One Arrow not achieved";
        default:
          return "BAD DATA...";
      }

    case "endgame":

      switch (missingEnum as EndgameMissing) {
        case EndgameMissing.EGAP:
          return "Enchanted Golden Apple not collected";
        case EndgameMissing.SKULLS:
          return "3+ Wither Skeleton Skulls not collected";
        case EndgameMissing.SHELLS:
          return "8+ Nautilus Shells not collected";
        default:
          return "BAD DATA...";
      }

    default:
      return "BAD DATA...";
  }
};