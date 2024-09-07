import { AAContext, AdvancementCriterias } from "../interfaces/Pace";

const CRITERIA_TOTALS = {
  shells: 8,
  biomes: 42,
  monsters: 33,
  animals: 19,
  cats: 11,
  foods: 39
};

export default function AdvancementDetailsTooltipContent(props: { criterias: AdvancementCriterias, context: AAContext }) {
  return (
    <div className="text-left">
      <p>Shells: { props.context.shells }/{ CRITERIA_TOTALS.shells }</p>
      <p>Biomes: { props.criterias.biomes.length }/{ CRITERIA_TOTALS.biomes }</p>
      <p>Monsters Killed: { props.criterias.monstersKilled.length }/{ CRITERIA_TOTALS.monsters }</p>
      <p>Animals Bred: { props.criterias.animalsBred.length }/{ CRITERIA_TOTALS.animals }</p>
      <p>Cats Tamed: { props.criterias.catsTamed.length }/{ CRITERIA_TOTALS.cats }</p>
      <p>Food Eaten: { props.criterias.foodEaten.length }/{ CRITERIA_TOTALS.foods }</p>
    </div>
  );
}