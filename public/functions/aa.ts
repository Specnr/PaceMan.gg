export const AA_STORY_ICON = "../images/aa_story.png"
export const AA_HUSBANDRY_ICON = "../images/aa_husbandry.png"
export const AA_ADVENTURE_ICON = "../images/aa_adventure.png"
export const AA_NETHER_ICON = "../images/aa_nether.png"
export const AA_END_ICON = "../images/aa_end.png"

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