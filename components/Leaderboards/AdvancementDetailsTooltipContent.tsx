import { fracToPerc } from "@/public/functions/frontendConverters";
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
      <p className="pr-2">
        { props.context.hasTrident ? "Has Trident" : "No Trident" }
      </p>
      <p>Shells: { fracToPerc(props.context.shells / CRITERIA_TOTALS.shells) }</p>
      <p>Biomes: { fracToPerc(props.criterias.biomes.length / CRITERIA_TOTALS.biomes) }</p>
      <p>Monsters Killed: { fracToPerc(props.criterias.monstersKilled.length / CRITERIA_TOTALS.monsters) }</p>
      <p>Animals Bred: { fracToPerc(props.criterias.animalsBred.length / CRITERIA_TOTALS.animals) }</p>
      <p>Cats Tamed: { fracToPerc(props.criterias.catsTamed.length / CRITERIA_TOTALS.cats) }</p>
      <p>Food Eaten: { fracToPerc(props.criterias.foodEaten.length / CRITERIA_TOTALS.foods) }</p>
    </div>
  );
}