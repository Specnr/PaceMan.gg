import Image from "next/image";
import { AA_COMPLETED_ICON, missingEnumToText, nameToIcon } from "@/public/functions/aa";
import { Tooltip } from "@nextui-org/react";

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
          <Image
            className="absolute h-full w-full z-10"
            alt={`${props.icon}-completed-icon`}
            src={AA_COMPLETED_ICON}
            width={30}
            height={30}
            unoptimized
          />
        }
        <Image
          className="absolute h-full w-full"
          alt={`${props.icon}-missing-icon`}
          src={nameToIcon(props.icon)}
          width={30}
          height={30}
          unoptimized
        />
      </div>
    </Tooltip>
  );
};