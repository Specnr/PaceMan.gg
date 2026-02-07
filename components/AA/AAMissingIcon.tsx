import { AA_COMPLETED_ICON, missingEnumToText, nameToIcon } from "@/public/functions/aa";
import { SpriteIcon } from "../Common/SpriteIcon";
import { Tooltip } from "@heroui/react";

interface Props {
  icon: string;
  context: number[];
};

const AAMissingIconTooltipContent = (context: number[], category: string) => {
  return (
    <div className="text-left p-2">
      <p className="font-medium mb-1 capitalize">{category} Requirements:</p>
      {context.length > 0 ? (
        <ul className="space-y-1">
          {
            context.map(n => (
              <li key={`${category}-${n}`} className="text-sm">• {missingEnumToText(n, category)}</li>
            ))
          }
        </ul>
      ) : (
        <p className="text-sm text-green-400">Completed!</p>
      )}
    </div>
  );
};

export const AAMissingIcon = (props: Props) => {
  return (
    <Tooltip
      showArrow
      content={AAMissingIconTooltipContent(props.context, props.icon)}
      className="bg-gray-900 border border-gray-700"
    >
      <div className="relative w-8 h-8 mx-0.5">
        {
          props.context.length === 0 &&
          <SpriteIcon
            className="absolute h-full w-full z-10"
            name={AA_COMPLETED_ICON}
            size={32}
          />
        }
        <SpriteIcon
          className="absolute h-full w-full"
          name={nameToIcon(props.icon)}
          size={32}
        />
      </div>
    </Tooltip>
  );
};