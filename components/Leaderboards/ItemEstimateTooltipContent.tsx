export default function ItemEstimateTooltipContent(estimates: any) {
  if (estimates.estimates == null) return;

  return (
    <div>
      <span className="pr-2">Pearls: {estimates.estimates["minecraft:ender_pearl"] || 0}</span>
      <span>Rods: {estimates.estimates["minecraft:blaze_rod"] || 0}</span>
    </div>
  );
}